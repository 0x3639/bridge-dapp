import { FC } from "react";
import "./nav-menu-button.scss";

const NavMenuButton: FC<{ content: string; link: string; isActive: boolean; icon: any }> = ({
  content,
  link,
  isActive,
  icon = {},
}) => {
  return (
    <div className={`nav-menu-button-container animate-on-hover ${isActive ? "active" : ""}`}>
      <div className={`nav-menu-button`}>
        <span className="mr-1">{icon}</span>
        {content}
      </div>
    </div>
  );
};

export default NavMenuButton;
