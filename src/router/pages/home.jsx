import React, { useRef, useState, useEffect } from 'react';
import chu from '../../include/pictures/chu-fes-260-removebg-preview.png';
import '../../include/Style/Home.css';
import { Link } from 'react-router-dom'
import Cards from '../../include/compenent/cards'

function Home(props) {
    const [counter, setCounter] = useState(0);
    const picture = useRef();

    useEffect(() => {
        const movepicture = setInterval(() => {
            setCounter(prevCounter => {
                if (prevCounter < 10) {
                    picture.current.classList.remove("active");
                    move();
                    return prevCounter + 1;
                } else {
                    clearInterval(movepicture);
                    return prevCounter;
                }
            });
        }, 1000);

        return () => clearInterval(movepicture); // Cleanup interval on component unmount
    }, []);

    const move = () => {
        if (counter < 10) {
            setTimeout(() => {
                picture.current.classList.add("active");
            }, 100);
            setTimeout(() => {
                picture.current.classList.remove("active");
            }, 1100);
        }
    };

    return (
        <section>

            <div className="bg-image">
                <div className={"box"}>
                    <img src={chu} className="" alt="..." ref={picture}/>
                    <h1 style={{color: 'whitesmoke', fontSize: "x-large", fontWeight: 'bold'}} className={"titel"}>
                        CENTRE HOSPITALIER UNIVERSITAIRE HASSAN II
                        <br/>
                        Un établissement de référence au service de la Santé

                    </h1>
                    <div className={"mt-5"}>
                        <Link to={'/'} className={"me-2"}>
                            <button className={'btn btn-primary border-5 radio '}>
                                Contact us
                            </button>
                        </Link>
                        <Link to={'/'} className={"ms-5"}>
                            <button className={'btn btn-light border-5 radio me-2'}>
                                Contact us
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
            <Cards></Cards>
        </section>
    );
}

export default Home;
