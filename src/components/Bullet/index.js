import "./Bullet.css";

const Bullet = ({ index, title, content }) => {
  return (
    <li className="bulletPoint">
      <h2 className="bulletPoint__number">{index}</h2>
      <h3 className="bulletPoint__title">{title}</h3>
      <p className="bulletPoint__content">{content}</p>
    </li>
  );
};

export default Bullet;
