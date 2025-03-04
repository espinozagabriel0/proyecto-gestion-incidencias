import { useParams } from "react-router-dom";
import Comments from "../components/Comments";

export default function CommentsPage() {
  // Pagina por parametros
  const {id} = useParams()
  return (
    <div>
      <Comments id={id}/>
    </div>
  )
}
