import mbox from "sweetalert";

const getButtons = (buttons) => {
  switch (buttons) {
    case "okay": {
      return {
        confirm: {
          text: "Okay",
          className: "mbox_button",
          visible: true,
        },
      };
    }

    default: {
      return {
        cancel: {
          text: "No",
          value: false,
          visible: true,
          className: "mbox_button",
        },
        confirm: {
          text: "Yes",
          value: true,
          visible: true,
          className: "mbox_button",
        },
      };
    }
  }
};

// callback --> Function to run if user clicks okay/yes
function popUpDialogue({ icon, title, text, buttons, callback }) {
  mbox({
    className: "mbox",
    title: title,
    icon: icon,
    text: text,
    buttons: getButtons(buttons),
  }).then((answer) => {
    if (answer && callback) {
      callback();
    }
  });
}

export default popUpDialogue;
