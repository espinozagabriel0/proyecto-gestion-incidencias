export default function Comment({author, date, body}) {
  return (
    <div className="card p-3 mt-2">
      <h5 className="text-end">
        Autor: <span>{author}</span>
        <span className="ms-4">{date}</span>
      </h5>
      <p>
        {body}
      </p>
    </div>
  );
}
