import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { TranslatePipe } from '../../core/translate.pipe';

interface StackTechnology {
  readonly name: string;
  readonly logo?: string;
}

@Component({
  selector: 'app-stack-marquee',
  imports: [TranslatePipe],
  templateUrl: './stack-marquee.component.html',
  styleUrl: './stack-marquee.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StackMarqueeComponent {
  protected readonly paused = signal(false);
  protected readonly rows: readonly (readonly StackTechnology[])[] = [
    [
      { name: 'Java', logo: 'java.svg' },
      { name: 'Spring Boot', logo: 'spring-boot.svg' },
      { name: 'Spring Security', logo: 'spring-security.svg' },
      { name: 'REST API' },
      { name: 'Spring Data JPA', logo: 'spring-data-jpa.svg' },
      { name: 'Hibernate', logo: 'hibernate.svg' },
      { name: 'PostgreSQL', logo: 'postgresql.svg' },
      { name: 'Flyway', logo: 'flyway.svg' },
      { name: 'MySQL', logo: 'mysql.svg' },
      { name: 'Redis', logo: 'redis.svg' },
      { name: 'Neon', logo: 'neon.svg' },
      { name: 'JUnit', logo: 'junit.svg' },
      { name: 'Mockito', logo: 'mockito.png' },
      { name: 'Testcontainers', logo: 'testcontainers.svg' },
    ],
    [
      { name: 'Angular', logo: 'angular.svg' },
      { name: 'TypeScript', logo: 'typescript.svg' },
      { name: 'JavaScript', logo: 'javascript.svg' },
      { name: 'HTML', logo: 'html.svg' },
      { name: 'CSS', logo: 'css.svg' },
      { name: 'Git', logo: 'git.svg' },
      { name: 'GitHub', logo: 'github.svg' },
      { name: 'GitHub Actions', logo: 'github-actions.svg' },
      { name: 'Maven', logo: 'maven.svg' },
      { name: 'Docker', logo: 'docker.svg' },
      { name: 'Vercel', logo: 'vercel.svg' },
      { name: 'Render', logo: 'render.svg' },
      { name: 'Claude Code', logo: 'claude-code.svg' },
      { name: 'Codex', logo: 'codex.svg' },
      { name: 'MCP', logo: 'mcp.svg' },
      { name: 'C++ (studio previsto)', logo: 'cpp.svg' },
    ],
  ];
}
