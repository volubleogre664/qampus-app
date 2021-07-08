import mbox from "sweetalert";

// callback --> Function to run if user clicks okay/yes
function popUpDialogue(icon, title, text, callback) {
  mbox({
    className: "mbox",
    title: title,
    icon: icon,
    text: text,
    buttons: {
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
    },
  }).then((answer) => {
    if (answer && callback) {
      callback();
    }
  });
}

export default popUpDialogue;
