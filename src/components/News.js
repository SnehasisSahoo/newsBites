import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function News() {
	/*
  INFO: possible categories:
  business
  entertainment
  environment
  food
  health
  politics
  science
  sports
  technology
  top
  world
  */

	//INFO: url params

	const { category } = useParams();

	const lang = "en";
	const [nextPage, setNextPage] = useState("");
	const [prevPage, setPrevPage] = useState("");
	const [page, setPage] = useState("");
	const [pageNo, setPageNo] = useState(1);
	const [res, setRes] = useState([]);
	const [status, setStatus] = useState("");

	const key = "pub_158149fc3caf3020f346e1c3512f775588f53";
	// const URL = `https://newsdata.io/api/1/news?apikey=${key}&category=${category}&language=${lang}`;

	// let hour = new Date().getHours();
	const getNews = async () => {
		try {
			const URL = `https://newsdata.io/api/1/news?apikey=${key}&category=${category}&language=${lang}&page=${page}`;
			const news = await axios.get(URL);
			setNextPage(news.data.nextPage);
			// console.log(news.data);
			setRes(news.data.results);
			// console.log(news.data);
			setStatus(news.data.status);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getNews();
		// alert("API malfunctioning: Pagination out of order.");
	}, [page]);

	const pageStart = () => {
		setPage("");
		setPageNo(1);
	};

	const pageEnd = () => {
		setPage(9);
	};

	const pageUp = () => {
		setPrevPage(page);
		setPage(nextPage);
		setPageNo(pageNo + 1);
	};

	const pageDown = () => {
		setPage(prevPage);
		setPageNo(pageNo - 1);
	};

	return (
		<>
			<div className='override'>
				<div className='header'>
					<Link to='/'>
						<h2 className='item'>{"< "}home</h2>
					</Link>
					<h1 style={{ textTransform: "uppercase" }}>{category}</h1>
					<div className='pagination'>
						<button className='item' onClick={pageStart} disabled={pageNo === 1}>
							{"<<"}
						</button>
						<button
							hidden
							className='item'
							onClick={pageDown}
							disabled={pageNo === 1}
						>
							{"<"}
						</button>
						<p className='page-no'>{`  ${pageNo}  `}</p>
						<button className='item' onClick={pageUp} disabled={page >= 9}>
							{">"}
						</button>
						<button
							hidden
							className='item'
							onClick={pageEnd}
							disabled={page >= 9}
						>
							{">>"}
						</button>
					</div>
				</div>
				<dl>
					{res.length > 0 ? (
						<>
							{res.map((data, i) => (
								<div key={i} className='news'>
									<dt>
										<h3>
											{(pageNo-1) * 10 + (i+1)}
											{". "}
											{data.title}
										</h3>
									</dt>
									<dd>
										<b>Breif: </b>
										{data.description == null
											? "description not found"
											: data.description}
									</dd>
									<a href={data.link} target='_blank' rel='noreferrer'>
										{" "}
										read more{" >>"}{" "}
									</a>
									<hr />
								</div>
							))}
						</>
					) : (
						<>
							<h2> loading ....</h2>
						</>
					)}
				</dl>
			</div>
		</>
	);
}
