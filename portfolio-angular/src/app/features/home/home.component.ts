import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GITHUB_ACTIVITY } from '../../data/github-activity.data';

const MONTH_NAMES = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
] as const;

interface ActivityCell {
  readonly column: number;
  readonly count: number;
  readonly date: string;
  readonly label: string;
  readonly level: number;
  readonly row: number;
}

interface PeriodStats {
  readonly activeDays: number;
  readonly activeWeekdays: number;
  readonly commits: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly skills = [
    {
      category: 'Backend',
      items: ['Java', 'Spring Boot', 'Spring JDBC', 'MySQL', 'REST API'],
    },
    {
      category: 'Frontend',
      items: ['Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      category: 'Strumenti',
      items: ['Git', 'GitHub', 'Vercel', 'VS Code'],
    },
  ] as const;

  readonly activity = GITHUB_ACTIVITY;
  readonly selectedMonth = signal('all');
  readonly monthOptions = this.buildMonthOptions();
  readonly periodStats = computed(() => this.calculatePeriodStats(this.selectedMonth()));
  readonly activityCells = computed(() => this.buildActivityCells(this.selectedMonth()));
  readonly currentWeekdayStreak = this.calculateCurrentWeekdayStreak();
  readonly longestWeekdayStreak = this.calculateLongestWeekdayStreak();
  readonly monthlyActivity = this.monthOptions.map((month) => ({
    ...month,
    commits: this.calculatePeriodStats(month.value).commits,
  }));
  readonly maxMonthlyCommits = Math.max(...this.monthlyActivity.map((month) => month.commits), 1);

  selectMonth(event: Event): void {
    this.selectedMonth.set((event.target as HTMLSelectElement).value);
  }

  selectMonthValue(value: string): void {
    this.selectedMonth.set(value);
  }

  private buildMonthOptions(): ReadonlyArray<{ label: string; value: string }> {
    const lastMonthIndex = Number(this.activity.snapshotDate.slice(5, 7));

    return MONTH_NAMES.slice(0, lastMonthIndex).map((label, index) => ({
      label,
      value: `${this.activity.year}-${String(index + 1).padStart(2, '0')}`,
    }));
  }

  private calculatePeriodStats(month: string): PeriodStats {
    const days = this.activity.daily.filter((day) => month === 'all' || day.date.startsWith(month));

    return days.reduce<PeriodStats>(
      (stats, day) => {
        const isWeekday = this.isWeekday(day.date);

        return {
          commits: stats.commits + day.count,
          activeDays: stats.activeDays + 1,
          activeWeekdays: stats.activeWeekdays + (isWeekday ? 1 : 0),
        };
      },
      { commits: 0, activeDays: 0, activeWeekdays: 0 },
    );
  }

  private buildActivityCells(month: string): ReadonlyArray<ActivityCell> {
    const startDate = month === 'all' ? `${this.activity.year}-01-01` : `${month}-01`;
    const monthEnd =
      month === 'all'
        ? this.activity.snapshotDate
        : this.toIsoDate(
            new Date(Date.UTC(Number(month.slice(0, 4)), Number(month.slice(5, 7)), 0)),
          );
    const endDate = monthEnd < this.activity.snapshotDate ? monthEnd : this.activity.snapshotDate;
    const counts = new Map<string, number>(
      this.activity.daily.map((day) => [day.date, day.count]),
    );
    const start = this.fromIsoDate(startDate);
    const end = this.fromIsoDate(endDate);
    const gridStart = new Date(start);
    const startDay = gridStart.getUTCDay();
    const daysFromMonday = startDay === 0 ? 6 : startDay - 1;
    gridStart.setUTCDate(gridStart.getUTCDate() - daysFromMonday);
    const cells: ActivityCell[] = [];

    for (const cursor = new Date(start); cursor <= end; cursor.setUTCDate(cursor.getUTCDate() + 1)) {
      const weekday = cursor.getUTCDay();
      if (weekday === 0 || weekday === 6) {
        continue;
      }

      const date = this.toIsoDate(cursor);
      const count = counts.get(date) ?? 0;
      const column = Math.floor((cursor.getTime() - gridStart.getTime()) / 604_800_000) + 1;

      cells.push({
        column,
        count,
        date,
        label: `${date}: ${count} commit`,
        level: this.toActivityLevel(count),
        row: weekday,
      });
    }

    return cells;
  }

  private calculateCurrentWeekdayStreak(): number {
    const counts = new Map<string, number>(
      this.activity.daily.map((day) => [day.date, day.count]),
    );
    const cursor = this.fromIsoDate(this.activity.streakCutoff);
    let streak = 0;

    while (cursor.getUTCFullYear() === this.activity.year) {
      if (cursor.getUTCDay() === 0 || cursor.getUTCDay() === 6) {
        cursor.setUTCDate(cursor.getUTCDate() - 1);
        continue;
      }

      if ((counts.get(this.toIsoDate(cursor)) ?? 0) === 0) {
        break;
      }

      streak += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }

    return streak;
  }

  private calculateLongestWeekdayStreak(): number {
    const counts = new Map<string, number>(
      this.activity.daily.map((day) => [day.date, day.count]),
    );
    const end = this.fromIsoDate(this.activity.streakCutoff);
    let current = 0;
    let longest = 0;

    for (
      const cursor = new Date(Date.UTC(this.activity.year, 0, 1));
      cursor <= end;
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    ) {
      if (cursor.getUTCDay() === 0 || cursor.getUTCDay() === 6) {
        continue;
      }

      if ((counts.get(this.toIsoDate(cursor)) ?? 0) > 0) {
        current += 1;
        longest = Math.max(longest, current);
      } else {
        current = 0;
      }
    }

    return longest;
  }

  private isWeekday(date: string): boolean {
    const weekday = this.fromIsoDate(date).getUTCDay();
    return weekday !== 0 && weekday !== 6;
  }

  private toActivityLevel(count: number): number {
    if (count === 0) return 0;
    if (count === 1) return 1;
    if (count <= 3) return 2;
    if (count <= 6) return 3;
    return 4;
  }

  private fromIsoDate(date: string): Date {
    return new Date(`${date}T00:00:00Z`);
  }

  private toIsoDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
