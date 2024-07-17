import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import '../Style/footer.css'
import { faFacebook, faFacebookF, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons'
function Footer(props) {
    return (
        <footer className="footer">
            <div className={"container"}>
                <div className={"row"}>
                    <div className="col-md-6 col-lg-3">
                        <aside className={"widget widget_text"}>
                            <div className={"widget-title"}>
                                <h5>  chu-fes.ma </h5>
                            </div>
                            <div className={"textwidget"}>
                                <p><FontAwesomeIcon icon={faCaretRight} size="1x" className={"me-2"}/>
                                    <Link to={"#"} className={"link"}>
                                        First link
                                    </Link>
                                </p>
                                <p><FontAwesomeIcon icon={faCaretRight} size="1x" className={"me-2"}/>
                                    <Link to={"#"} className={"link"}>
                                        seconde link
                                    </Link>
                                </p>
                                <p><FontAwesomeIcon icon={faCaretRight} size="1x" className={"me-2"}/>
                                    <Link to={"#"} className={"link"}>
                                        third link
                                    </Link>
                                </p>

                            </div>
                        </aside>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <aside className={"widget widget_text"}>
                            <div className={"widget-title"}>
                                <h5> DIRECT </h5>
                            </div>
                            <div className={'textwidget'}>
                                <p>
                                    <span> E-mail: </span>
                                    <Link to={'#'} className={"link"}>contactr@chufes.ac.ma< /Link>
                                </p>
                                <p>
                                    Phone: +212 05356-19053
                                </p>
                                <p>
                                    Fax: +212 05356-19053
                                </p>
                                <p>
                                    Horaires :
                                    <span style={{color:"green"}} className={"ms-1"}>Ouvert 24h/24</span>

                                </p>
                                <div>
                                    Profils
                                    <br/>
                                    <a href="https://www.linkedin.com/company/centre-hospitalier-universitaire-hassan-ii/"
                                       target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faLinkedin} size="3x" className="me-3"/>
                                    </a>

                                    <a href='https://www.facebook.com/ChuHassan2Fes/' target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFacebook} size={'3x'}
                                                         className={'me-3'}></FontAwesomeIcon>
                                    </a>
                                     <a href="https://www.youtube" target="_blank"
                                           rel="noopener noreferrer">

                                            <FontAwesomeIcon icon={faYoutube} size={'3x'}
                                                             className={'me-3'}></FontAwesomeIcon>
                                        </a>
                                </div>

                                <button className={'btn btn-dark mt-3'}>
                                <Link to={'#'} className={'link'}>Contatc</Link>
                                </button>
                            </div>
                        </aside>
                    </div>

                    <div className="col-md-6 col-lg-3">
                        <aside className={"widget widget_text"}>
                            <div className={"widget-title"}>
                                <h5> ADRESSE</h5>
                            </div>
                            <div className={"textwidget"}>
                                <p>
                                    Centre Hospitalier Hrazem, BP:1835 Atlas, Fès, Avenue Hassan II, Fes 30050
                                </p>
                            </div>
                        </aside>
                    </div>
                    <div className="col-md-6 col-lg-3">
                        <aside className={"widget widget_text"}>
                            <div className={"widget-title"}>
                                <h5> CHU de Fès
                                </h5>
                            </div>
                            <div className={"textwidget"}>
                                <p>
                                    Le CHU Hassan II (Fès) est un centre hospitalier universitaire situé dans la ville de Fès, à proximité de la faculté de médecine et de pharmacie. Ce centre s'étend sur une superficie de 12 hectares, et il est sous la juridiction du ministère marocain de la Santé.                                </p>
                            </div>
                        </aside>
                    </div>
                </div>

                <div className={"footer-copyrieght"}>
                    <div className={"container"}>
                        <div className={"row"}>
                            <div className={"col-md-12"}>
                                <div className={"text-center"}>
                                    <span>
                                        © 2024 Centre Hospitalier Universitaire Hassan II.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

    )
}

export default Footer