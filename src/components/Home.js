import { Link } from "react-router-dom";

const categoryArray = [
	"business",
	"entertainment",
	"environment",
	"food",
	"health",
	"politics",
	"science",
	"sports",
	"technology",
	"top",
	"world",
];

export default function Home() {
	return (
		<>
			<h1 style={{ fontWeight: "bolder", margin: "3vh" }}> News Bites </h1>
			<hr style={{ border: "1px solid black", margin: "3vh 0" }} />
			<div className='grid'>
				{categoryArray.map((item, i) => (
					<Link to={`news/${item}`} className='card' key={i}>
							<h2>{item}</h2>
					</Link>
				))}
				{/* { categoryArray.map((item,i)=>
            (<div className="card" key={i}>
              <h2 onClick={()=>{setCategory(item); console.log(item);}}>{item}</h2>
            </div>)
          )} */}
				<div className='author-card'>
					<h2>
						<a
							href='https://www.behance.net/ssahoo'
							target='_blank'
							rel='author noreferrer'
						>
							Author{" >>"}
						</a>
					</h2>
				</div>
			</div>
		</>
	);
}
