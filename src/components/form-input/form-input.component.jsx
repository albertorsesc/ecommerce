import './form-input.styles.scss';

const FormInput = ({ label, ...attributes }) => {
  return (
    <div className='group'>
      <input className='form-input' {...attributes} />
      {
        label && (
          <label className={`${attributes.value.length ? 'shrink' : '' } form-input-label`}>
            {label}
          </label>
        )
      }
    </div>
  );
}

export default FormInput;