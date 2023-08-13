import { Link } from "react-router-dom";

export default function TableRow({ post }) {
    const formattedDate = new Date(post.createdDate).toLocaleString();
    return (
      <tr>
        <td>{post.id}</td>
        <td style={{maxWidth: '200px',overflow: 'hidden',whiteSpace: 'nowrap',textOverflow: 'ellipsis'}}><Link to={`/board/${post.id}`}>{post.title}</Link></td>
        <td>{post.writer}</td>
        <td>{formattedDate}</td>
        <td>{post.viewCnt}</td>
      </tr>
    );
  }