import { plainText, richText } from './rich-text.pipe';

describe('rich text', () => {
  it('turns the two markers into strong and em', () => {
    expect(richText('Uso {b}Spring Boot{/b} e {i}Flyway{/i}.')).toBe(
      'Uso <strong>Spring Boot</strong> e <em>Flyway</em>.',
    );
  });

  it('escapes any other markup first', () => {
    expect(richText('{b}<img src=x onerror=alert(1)>{/b} & più')).toBe(
      '<strong>&lt;img src=x onerror=alert(1)&gt;</strong> &amp; più',
    );
  });

  it('leaves characters such as * and _ alone', () => {
    expect(richText('ROLE_* e /auth/* con JOB_CREATED')).toBe('ROLE_* e /auth/* con JOB_CREATED');
  });

  it('removes the markers for plain text', () => {
    expect(plainText('{b}Backend{/b} con {i}PostgreSQL{/i}')).toBe('Backend con PostgreSQL');
  });
});
