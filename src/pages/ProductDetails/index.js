import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux-setup/reducers/cart";
import { getProduct, getCommentsProduct, createCommentProduct } from "../../services/Api";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { getImageProduct, formatPrice } from "../../shared/ultils";
import moment from "moment";
import { toast } from 'react-toastify';
import Heading from './../../shared/components/common/Heading';
import {
  IconReplyComment,
  IconRobot,
  IconSend,
  IconTime,
  IconUserV2
} from "../../shared/components/icon";
import Button from "../../shared/components/button";
import Pagination from "../../shared/components/Pagination";

const ProductDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState({});
  const [replyToCommentId, setReplyToCommentId] = useState(null);
  const [activeReplyCommentId, setActiveReplyCommentId] = useState(null);
  const [rootCommentId, setRootCommentId] = useState(null);

  // pagination
  const limit = 5;
  const [pages, setPages] = useState({ limit });
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = Number(searchParams.get('page')) || 1;

  const customer = useSelector(({ Auth }) => Auth.login.currentCustomer)

  const clickAddToCart = (type) => {
    dispatch(addToCart({
      _id: id,
      name: product.name,
      image: product.image,
      price: product.price,
      qty: 1,
    }));
    if (type === "buy-now") {
      return navigate("/Cart");
    }
    toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
  };

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setInputComment({ ...inputComment, [name]: value });
  };

  const onClickSubmit = (e) => {
    e.preventDefault();
    if (!inputComment.content || inputComment.content.trim() === "") {
      toast.error('Nội dung bình luận không được để trống!');
      return;
    }
    if (customer) {
      const commentData = {
        name: inputComment.name || customer.fullName,
        email: inputComment.email || customer.email,
        content: inputComment.content,
        parent_id: rootCommentId || replyToCommentId,
        root_comment_id: rootCommentId,
      };

      return createCommentProduct(id, commentData)
        .then(({ data }) => {
          if (data.status === "success") {
            setInputComment({
              name: customer.fullName,
              email: customer.email,
              content: ""
            });
            getComments(id);
          }
          toast.success("Bình luận của bạn đã được gửi. Xin cảm ơn!")
        });

    } else {
      toast.error('Bạn phải đăng nhập mới được gửi đánh giá!')
      return navigate('/Login')
    }
  }

  const clickReplyComment = (parentId, rootCommentId) => {
    if (activeReplyCommentId === parentId) {
      setActiveReplyCommentId(null);
      setRootCommentId(null);
      setReplyToCommentId(null);
    } else {
      setReplyToCommentId(parentId);
      setActiveReplyCommentId(parentId);
      setRootCommentId(rootCommentId);
    }
  };

  const getComments = (id) => {
    getCommentsProduct(id, {
      params: {
        limit,
        page,
        keyword
      }
    })
      .then(({ data }) => {
        setPages({ ...pages, ...data.data.pages });
        const commentsData = data.data.docs;
        const commentsById = {};

        // nếu không có parent_id --> comment gốc
        commentsData.forEach(comment => {
          if (!comment.cmt_parent_id) {
            commentsById[comment._id] = { ...comment, replies: [], root_comment_id: comment._id };
          }
        });

        // nếu có parent_id tìm comment gốc --> reply comment
        commentsData.forEach(comment => {
          if (comment.cmt_parent_id) {
            if (commentsById[comment.cmt_parent_id]) {
              commentsById[comment.cmt_parent_id].replies.push(
                { ...comment, root_comment_id: commentsById[comment.cmt_parent_id].root_comment_id });
            }
          }
        });

        setComments(Object.values(commentsById));
      });
  };


  useEffect(() => {
    getProduct(id, {}).then(({ data }) => {
      setProduct(data?.data);
      getComments(id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, page, keyword]);

  const handlePageChange = (newPage) => {
    setSearchParams({ keyword, page: newPage });
  };

  useEffect(() => {
    document.title = "MobileShop - Chi tiết sản phẩm";
  }, []);

  return (
    <div className="container">
      {/* List Product */}
      <div id="product">
        <div id="product-head" className="form-product__details">
          <div id="product-img" className="col-lg-6 col-md-6 col-sm-12">
            <img alt="" src={getImageProduct(product?.image)} />
          </div>
          <div id="product-details" className="col-lg-6 col-md-6 col-sm-12">
            <Heading>{product?.name}</Heading>
            <ul>
              <li>
                <span>Bảo hành:</span> 12 Tháng
              </li>
              <li>
                <span>Đi kèm:</span> {product?.accessories}
              </li>
              <li>
                <span>Tình trạng:</span> {product?.status}
              </li>
              <li>
                <span>Khuyến Mại:</span> {product?.promotion}
              </li>
              <li id="price">Giá Bán (chưa bao gồm VAT)</li>
              <li id="price-number">{formatPrice(product?.price)}đ</li>
              <li id="status" className={product?.is_stock ? "" : "text-danger"} >
                {product?.is_stock ? "Còn hàng" : "Hết hàng"}
              </li>
            </ul>
            {product?.is_stock && (
              <div id="add-cart">
                <Button onClick={() => clickAddToCart("buy-now")} className="mr-2 btn btn-warning">
                  Mua ngay
                </Button>
                <Button onClick={clickAddToCart} className="btn btn-info">
                  Thêm vào giỏ hàng
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className="form-product">
          <div className="form-product__details w-6__per">
            <Heading className="text-center">Đặc điểm nổi bật</Heading>
            {product?.details}
          </div>
          <div className="form-product__details w-4__per form-product_specifications">
            <Heading className="text-center form-product__text">Thông số kĩ thuật</Heading>
            <ul className="product-tech__content">
              <li className="product-tech__content-item">
                <p>Kích thước màn</p>
                <span>
                  6.1 inches
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Công nghệ màn hình</p>
                <span>
                  Super Retina XDR OLED
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Camera sau</p>
                <span>
                  Camera chính: 48MP, 24 mm, ƒ/1.78,
                  Camera góc siêu rộng: 12 MP, 13 mm, ƒ/2.2
                  Camera Tele 3x: 12 MP, 77 mm, ƒ/2.8
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Camera trước</p>
                <span>
                  12MP, ƒ/1.9
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Chipset</p>
                <span>
                  Apple A17 Pro 6 nhân
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Dung lượng RAM</p>
                <span>
                  8 GB
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Bộ nhớ trong</p>
                <span>
                  256 GB
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Pin</p>
                <span>
                  3274 mAh
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Thẻ SIM</p>
                <span>
                  2 SIM (nano‑SIM và eSIM)
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Hệ điều hành</p>
                <span>
                  iOS 17
                </span>
              </li>
              <li className="product-tech__content-item">
                <p>Độ phân giải màn hình</p>
                <span>
                  2556 x 1179 pixels
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div id="comments-list">
          <div>
            <Heading className="comment-list__title">Bình luận & nhận xét {product?.name}</Heading>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="reply-input">
                <form method="post" className="reply-input__form">
                  <IconRobot className="icon-robot" />
                  <textarea
                    name="content"
                    required
                    rows={8}
                    className="reply-input__text"
                    onChange={onChangeInput}
                    placeholder="Xin mời để lại câu hỏi hệ thống sẽ trả lời trong vòng 1h, chậm nhất 1 ngày làm việc 8h-22h trừ T7, CN, ngày lễ "
                    value={inputComment.content || ""}
                  />
                </form>
                <div className="reply-input__meta">
                  <Button onClick={onClickSubmit} type="submit" name="sbm" className="reply-input__btn">
                    <IconSend />
                    <p>Gửi</p>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {comments.map((comment, index) => (
            <>
              {/* Comment Parent */}
              <div key={index} className="col-lg-12 col-md-12 col-sm-12 comment">
                <div className="comment-item">
                  <div>
                    <div className="comment-item__info">
                      <b className="comment-item__icon-name"><IconUserV2 /> {comment.cmt_user_name}</b>
                      <div className="comment-item__time">
                        <IconTime />
                        <span>{moment(comment.createdAt).fromNow()}</span>
                      </div>
                    </div>
                    <div className="comment-item__content">
                      <p>{comment.cmt_content}</p>
                      <div className="comment_item__reply">
                        <Button onClick={() => clickReplyComment(comment._id)} className="comment_item__button">
                          <IconReplyComment />
                          <p>{activeReplyCommentId === comment._id ? "Đóng" : "Trả lời"}</p>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Comment Parent */}

              {/* Click show box reply comment */}
              {activeReplyCommentId === comment._id && (
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="reply-input">
                    <form method="post" className="reply-input__form">
                      <IconRobot className="icon-robot" />
                      <textarea
                        name="content"
                        required
                        rows={8}
                        className="reply-input__text"
                        onChange={onChangeInput}
                        placeholder="Xin mời để lại câu hỏi hệ thống sẽ trả lời trong vòng 1h, chậm nhất 1 ngày làm việc 8h-22h trừ T7, CN, ngày lễ "
                        value={inputComment.content || ""}
                      />
                    </form>
                    <div className="reply-input__meta">
                      <Button onClick={onClickSubmit} type="submit" name="sbm" className="reply-input__btn">
                        <IconSend />
                        <p>Gửi</p>
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {/* End click show box reply comment */}

              {/* Comment Reply (Child) */}
              {comment.replies && comment.replies.map((reply, replyIndex) => (
                <>
                  <div className="col-lg-12 col-md-12 col-sm-12 comment-list_reply" key={replyIndex}>
                    <div className="comment-item">
                      <div>
                        <div className="comment-item__info">
                          <b><IconUserV2 /> {reply.cmt_user_name}</b>
                          <div className="comment-item__time">
                            <IconTime />
                            <span>{moment(reply.createdAt).fromNow()}</span>
                          </div>
                        </div>
                        <div className="comment-item__content">
                          <p>{reply.cmt_content}</p>
                          <div className="comment_item__reply">
                            <Button onClick={() => clickReplyComment(reply._id, comment._id)} className="comment_item__button">
                              <IconReplyComment />
                              <p>{activeReplyCommentId === reply._id ? "Đóng" : "Trả lời"}</p>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {activeReplyCommentId === reply._id && (
                    <div className="col-lg-12 col-md-12 col-sm-12">
                      <div className="reply-input">
                        <form method="post" className="reply-input__form">
                          <IconRobot className="icon-robot" />
                          <textarea
                            name="content"
                            required
                            rows={8}
                            className="reply-input__text"
                            onChange={onChangeInput}
                            placeholder="Xin mời để lại câu hỏi hệ thống sẽ trả lời trong vòng 1h, chậm nhất 1 ngày làm việc 8h-22h trừ T7, CN, ngày lễ "
                            value={inputComment.content || ""}
                          />
                        </form>
                        <div className="reply-input__meta">
                          <Button onClick={onClickSubmit} type="submit" name="sbm" className="reply-input__btn">
                            <IconSend />
                            <p>Gửi</p>
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ))}
              {/* End Comment Reply (Child) */}
            </>
          ))}
        </div>
      </div>

      {/* End Product */}
      <div id="pagination">
        <Pagination pages={pages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};
export default ProductDetails;
