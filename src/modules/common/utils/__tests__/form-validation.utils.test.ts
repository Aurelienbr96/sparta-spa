import { email, equalTo, required } from '../form-validation.utils';

describe('FormValidationUtils', () => {
  describe('required', () => {
    it('Should return the message if value is empty', () => {
      const validate = required('app.error.unknown');
      expect(validate('')).toBe('app.error.unknown');
    });

    it('Should return undefined otherwise', () => {
      const validate = required('app.error.unknown');
      expect(validate('mock-value')).toBe(undefined);
    });
  });

  describe('email', () => {
    it('Should return message if value is empty', () => {
      const validate = email('app.error.unknown');
      expect(validate('')).toBe('app.error.unknown');
    });

    it('Should return message if value is not email otherwise', () => {
      const validate = email('app.error.unknown');
      expect(validate('not-an-email')).toBe('app.error.unknown');
    });

    it('Should return undefined otherwise', () => {
      const validate = email('app.error.unknown');
      expect(validate('john.doe@company.com')).toBe(undefined);
    });
  });

  describe('equalTo', () => {
    it('Should return requiredMessage if value is empty', () => {
      const validate = equalTo('mock-value', 'app.error.unknown', 'mock-required-error');
      expect(validate('')).toBe('mock-required-error');
    });

    it('Should return message if value is expect one', () => {
      const validate = equalTo('mock-value', 'app.error.unknown', 'mock-required-error');
      expect(validate('bac-mock-value')).toBe('app.error.unknown');
    });

    it('Should return undefined otherwise', () => {
      const validate = equalTo('mock-value', 'app.error.unknown', 'mock-required-error');
      expect(validate('mock-value')).toBe(undefined);
    });
  });
});
