import { Button } from "@material-ui/core";

import "./Button.css";

function CustomButton({ text, ...rest }) {
  return (
    <Button className="formSubmitBtn" {...rest}>
      {text}
    </Button>
  );
}

export default CustomButton;
