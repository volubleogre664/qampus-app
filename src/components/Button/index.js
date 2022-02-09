import "./Button.css";

function CustomButton({ text, ...rest }) {
  return (
    <button className="formSubmitBtn" {...rest}>
      {text}
    </button>
  );
}

export default CustomButton;
