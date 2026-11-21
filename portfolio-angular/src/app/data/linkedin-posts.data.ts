/** Post di LinkedIn mostrati nella pagina Contatti. Si aggiunge un post con una riga. */
export interface LinkedinPost {
  /** Identificativo del post, dal codice «Incorpora questo post» di LinkedIn: `urn:li:share:<numero>`. */
  readonly urn: string;
  /** Altezza indicata da LinkedIn per il suo codice incorporato. */
  readonly height: number;
  /** Frase che dice di cosa parla il post: nome accessibile del riquadro e testo di riserva. */
  readonly summary: string;
}

export const LINKEDIN_POSTS: readonly LinkedinPost[] = [
  {
    urn: 'urn:li:share:7523844441846140928',
    height: 1160,
    summary:
      'Aggiornamento sui progetti principali (Expense Tracker, AccessDesk, JobFlow) e sul portfolio',
  },
];
