import { message, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Comment, Header } from "semantic-ui-react";
import commentApi from "../../../api/commentApi";
import replyApi from "../../../api/replyApi";
import { monkeyLearnAnalysis } from "../../utils/monkeylearn";
import "./comment.css";
export default function Comments() {
  const location = useLocation();
  const [restaurantId, setRestaurantId] = useState(location.state.id);
  const [comments, setComments] = useState([]);
  const [binhluan, setBinhluan] = useState("");
  const [replys, setReplys] = useState([]);
  const [userId, setUserId] = useState("");
  const [commentId, setCommentId] = useState(0);
  const userRole = localStorage.getItem("role");
  useEffect(() => {
    getComment();
    const userId = localStorage.getItem("userId");
    setUserId(userId);
    setRestaurantId(location.state.id);
    getReply();
  }, []);
  const getComment = async () => {
    const commentItem = await commentApi.getOne(location.state.id);
    setComments(commentItem.data);
  };
  const getReply = async () => {
    const replyItem = await replyApi.getAll();
    setReplys(replyItem.data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (userRole === "restaurant")
      if (!commentId) message.error("Chưa chọn trả lời bình luận nào");
      else {
        await replyApi.postreply({ commentId, userId, replyContent: binhluan });
        setBinhluan("");
        getComment();
        getReply();
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
        setBinhluan("");
        getComment();
      }
    }
  };
  const onChange = (e) => {
    setBinhluan(e.target.value);
  };
  const onClickReply = (e) => {
    setCommentId(e.target.attributes.value.value);
    console.log(commentId);
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
              ) : (
                <div
                  style={
                    item.analyzeComment === "Negative"
                      ? { "background-color": "red" }
                      : { "background-color": "green" }
                  }
                >
                  <Comment.Text>{item.content}</Comment.Text>
                </div>
              )}
              {userRole !== "restaurant" ? (
                ""
              ) : !replys.find((reply) => {
                  return reply.commentId === item.id;
                }) ? (
                <Comment.Actions>
                  <Comment.Action onClick={onClickReply} value={item.id}>
                    Reply
                  </Comment.Action>
                </Comment.Actions>
              ) : (
                ""
              )}
            </Comment.Content>
            {replys.find((reply) => {
              return reply.commentId === item.id;
            }) ? (
              <Comment.Group>
                <Comment>
                  <Comment.Avatar src="https://react.semantic-ui.com/images/avatar/small/jenny.jpg" />
                  <Comment.Content>
                    <Comment.Author as="a">
                      {
                        replys.find((reply) => {
                          return reply.commentId === item.id;
                        })?.User?.name
                      }
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>
                        {
                          replys.find((reply) => {
                            return reply.commentId === item.id;
                          }).createdAt
                        }
                      </div>
                    </Comment.Metadata>
                    <Comment.Text>
                      {
                        replys.find((reply) => {
                          return reply.commentId === item.id;
                        }).replyContent
                      }
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            ) : (
              ""
            )}
          </Comment>
        ))
      )}

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
              placeholder="Phản hồi của bạn"
              className="form-control"
            ></textarea>
          </div>
          <div className="position-relative">
            <Button htmlType="submit" type="primary" className="btn-dg">
              Thêm phản hồi
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
