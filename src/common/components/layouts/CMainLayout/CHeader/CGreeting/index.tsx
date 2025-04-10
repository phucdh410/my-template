const name = "Hoàng Phúc";

import "./styles.scss";

export const CGreeting = () => {
  return (
    <span className="greeting">
      xin chào, {name}
      <span className="overlay"></span>
    </span>
  );
};
