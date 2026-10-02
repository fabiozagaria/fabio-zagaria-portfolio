# Contesto tecnico — Portfolio

Aggiornato: 2026-10-02

## Obiettivo
Presentare in modo professionale e verificabile il profilo di Fabio Zagaria come Junior Backend Developer con visione full stack, mantenendo allineati portfolio, progetti, CV e stato tecnico reale.

## Stato osservato
- Portfolio Angular 21 / TypeScript 5.9.
- Deploy su Vercel.
- CI GitHub Actions con controlli di formato, test e build.
- Struttura con componenti standalone, routing lazy, dati tipizzati, attenzione a SEO, accessibilità e performance.
- Expense Tracker è il progetto full stack in verifica: entrate e dashboard sono presenti nel codice, ma la verifica E2E completa resta aperta. La demo è frontend; la persistenza richiede il backend locale.
- LabTV è una release frontend conclusa basata sull'integrazione della TMDB API.
- JobFlow è il progetto principale in sviluppo: esplora job asincroni, lifecycle, worker e processor partendo da un primo vertical slice di generazione PDF. Sono implementati dominio Job, stati, GeneratePdfWork e POST /jobs con validazione e persistenza JPA/MySQL; l'esecuzione asincrona reale deve ancora essere implementata.

- Spring Scaffold CLI dimostra tooling Java e generazione DTO; la generazione di risorse complete è futura.
- Task Manager resta un laboratorio guidato: refresh, rotazione e logout sono implementati; test comportamentali e documentazione sono da completare.

## Regole di mantenimento
- Aggiornare il portfolio solo quando una competenza o un progetto è realmente dimostrabile.
- Mantenere allineati README, contenuti del sito e CV.
- Il generatore del CV nel portfolio è la sorgente autorevole del curriculum.
- Non riportare qui voti, ripassi o cronologia didattica: restano in Notion.

## Curriculum pubblico
- `portfolio-angular/src/assets/documents/CV.pdf` è l'unico curriculum distribuito dal sito.
- Il layout è a colonna singola, testuale, leggibile e compatibile con i sistemi ATS.
- Il generatore `portfolio-angular/scripts/generate_cv.py` resta la sorgente autorevole; le copie da colloquio modificabili restano fuori dal repository pubblico.

## Punto di attenzione
Quando cambiano versione, stato o focus di un progetto pubblico collegato, verificare se il portfolio necessita di sincronizzazione.
