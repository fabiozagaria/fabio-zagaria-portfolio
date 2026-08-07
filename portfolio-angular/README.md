# Applicazione Angular del portfolio

Questa cartella contiene l'applicazione web del [portfolio di Fabio Zagaria](../README.md).

## Requisiti

- Node.js `20.19+`, `22.12+` oppure `24+`.
- npm `10+`.

La versione Node consigliata per sviluppo e CI è indicata nel file [`.nvmrc`](../.nvmrc).

## Comandi disponibili

| Comando                | Funzione                                                             |
| ---------------------- | -------------------------------------------------------------------- |
| `npm start`            | Avvia il server di sviluppo su `http://localhost:4200`               |
| `npm run build`        | Crea la build Angular di produzione                                  |
| `npm run test:ci`      | Esegue i test una volta e termina il processo                        |
| `npm run format:check` | Controlla la formattazione di TypeScript, HTML, CSS e configurazioni |
| `npm run watch`        | Ricompila in modalità development a ogni modifica                    |

## Organizzazione del codice

- `src/app/core`: layout principale, routing e configurazione applicativa.
- `src/app/data`: modelli e dataset condivisi.
- `src/app/features`: pagine standalone caricate in modo lazy.
- `src/assets/documents`: CV e attestato distribuiti con il sito.
- `src/assets/img`: immagini sorgente e versioni WebP ottimizzate.
- `scripts/generate_cv.py`: generazione del curriculum PDF.

## Asset di produzione

La configurazione Angular copia nella build soltanto:

- i documenti PDF;
- il favicon;
- le immagini WebP utilizzate dall'interfaccia.

Le immagini PNG originali restano disponibili come sorgenti ma non aumentano le dimensioni del deploy.

## Controlli prima di una modifica

```bash
npm ci
npm run format:check
npm run test:ci
npm run build
```

I controlli vengono replicati dal workflow GitHub Actions presente in `.github/workflows/ci.yml`.
