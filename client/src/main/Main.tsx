import Insert from "./comp/Insert";
import List from "./comp/List";
import Post from "./comp/Post";
import "./Main.scss";

const Main = () => {
  return (
    <div className="container">
      <div className="containerLeft">
        <div className="contianerUp">
          <Insert></Insert>
        </div>
        <div className="contianerDown">
          <Post></Post>
        </div>
      </div>
      <div className="containerRight">
        <List></List>
      </div>
    </div>
  );
};

export default Main;
