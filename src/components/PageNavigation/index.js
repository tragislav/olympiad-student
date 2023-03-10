import "./styled.css";

function PageNavigation({ pageNumber }) {
  return (
    <div className="NavWrapper">
      <div className={pageNumber === 1 ? "NavItem NavItemActive" : "NavItem"}>
        <h3 className="NavItemText">1. Личные данные</h3>
      </div>
      <div className={pageNumber === 2 ? "NavItem NavItemActive" : "NavItem"}>
        <h3 className="NavItemText">2. Законный представитель</h3>
      </div>
      <div className={pageNumber === 3 ? "NavItem NavItemActive" : "NavItem"}>
        <h3 className="NavItemText">3. Выбор специальности</h3>
      </div>
    </div>
  );
}

export default PageNavigation;
