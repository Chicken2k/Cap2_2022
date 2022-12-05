import { message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Comment, Header } from "semantic-ui-react";
import commentApi from "../../../api/commentApi";
import { monkeyLearnAnalysis } from "../../utils/monkeylearn";
import "./comment.css";
export default function Comments() {
  const location = useLocation();
  const [restaurantId, setRestaurantId] = useState(location.state.id);
  const [comments, setComments] = useState([]);
  const [binhluan, setBinhluan] = useState("");
  const [userId, setUserId] = useState("");
  const [replyCommentId, setReplyCommentId] = useState(0);
  const userRole = localStorage.getItem("role");
  useEffect(() => {
    getComment();
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    setRestaurantId(location.state.id);
  }, []);
  const getComment = async () => {
    const commentItem = await commentApi.getOne(location.state.id);
    setComments(commentItem.data);
  };
  const onClick = (e) => {
    console.log(156);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userRole === "restaurant")
      if (!replyCommentId) message.error("Chưa chọn trả lời bình luận nào");
      else {
        message.warn("them binh luan");
      }
    else {
      if (!userId) message.error("Bạn chưa đăng nhập");
      else if (binhluan.length < 10) message.error("Bình luận dưới 10 ký tự");
      else if (comments.find((item) => item.userId === Number(userId)))
        message.warn("Cảm ơn bình luận từ bạn, Bạn đã đánh giá trước đó");
      else {
        const analyzeComment = await monkeyLearnAnalysis(binhluan);
        console.log(restaurantId, userId, binhluan, analyzeComment);
        await commentApi.postcomment({
          restaurantId,
          userId,
          content: binhluan,
          analyzeComment,
        });
        getComment();
      }
    }
  };

  const onChange = (e) => {
    setBinhluan(e.target.value);
  };
  const onClickReply = (e) => {
    setReplyCommentId(e.target.attributes.value.value);
    console.log(replyCommentId);
  };
  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>
      {!comments.length ? (
        <div className="spin">
          <Spin />
        </div>
      ) : (
        comments.map((item, index) => (
          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
            <Comment.Content>
              <Comment.Author as="a">{item.User.name}</Comment.Author>
              <Comment.Metadata>
                <div>{item.createdAt}</div>
              </Comment.Metadata>
              {userRole === "customer" ? (
                <Comment.Text>{item.content}</Comment.Text>
              ) : item.analyzeComment === "Negative" ? (
                <div className="comment-text">
                  <Comment.Text>{item.content}</Comment.Text>
                </div>
              ) : (
                <Comment.Text>{item.content}</Comment.Text>
              )}
              {userRole !== "restaurant" ? (
                ""
              ) : (
                <Comment.Actions>
                  <Comment.Action onClick={onClickReply} value={item.id}>
                    Reply
                  </Comment.Action>
                </Comment.Actions>
              )}
            </Comment.Content>
          </Comment>
        ))
      )}

      <Comment>
        <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
        <Comment.Content>
          <Comment.Author as="a">Elliot Fu</Comment.Author>
          <Comment.Metadata>
            <div>Yesterday at 12:30AM</div>
          </Comment.Metadata>
          <div className="comment-text">
            <Comment.Text>
              <p>This has been very useful for my research. Thanks as well!</p>
            </Comment.Text>
          </div>
          <Comment.Actions>
            <Comment.Action onClick={onClickReply}>Reply</Comment.Action>
          </Comment.Actions>
        </Comment.Content>
        <Comment.Group>
          <Comment>
            <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
            <Comment.Content>
              <Comment.Author as="a">Jenny Hess</Comment.Author>
              <Comment.Metadata>
                <div>Just now</div>
              </Comment.Metadata>
              <Comment.Text>Elliot you are always so right :)</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>
        </Comment.Group>
      </Comment>
      <div>
        <form action="" method="post" onSubmit={onSubmit}>
          <div class="form-group">
            <label for=""></label>
            <textarea
              name="binhluan"
              value={binhluan}
              onChange={onChange}
              id=""
              cols="30"
              rows="7"
              placeholder="Đánh giá của bạn"
              className="form-control"
            ></textarea>
          </div>
          <div className="position-relative">
            <Button htmlType="submit" type="primary" className="btn-dg">
              Đánh giá
            </Button>
          </div>
        </form>
      </div>
      {/* <Form reply>
        <Form.TextArea />
        <Button
          content="Add Reply"
          onClick={onClick}
          labelPosition="left"
          icon="edit"
          primary
        />
      </Form> */}
    </Comment.Group>
  );
}
