import React from 'react'
import { Link } from 'react-router-dom'

function Anounces(props) {
    return (
        <div className={"container-fluid"}>
            <div className="row">
                    <div className="row">
                        <div className="col-md-12">
                            <div className={"special-heading"}>
                                <h5>Annonces </h5>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className={'main-box'}>
                                <div className={'titel-box'}>
                                    <h6>Avis aux patients</h6>
                                </div>
                                <div className={'content-box'}>
                                    <p>
                                        Veuillez noter que notre service d'urgence est actuellement en travaux de
                                        rénovation. Nous vous prions
                                        de vous diriger vers l'entrée principale pour toute assistance.
                                        <Link to={'/'}>
                                            <button className={'badge btn-primary '}
                                                    style={{"backgroundColor": "#17a2b8"}}>
                                                En savoir plus
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                                <div className={'links-box'}>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-4">
                            <div className="main-box">
                                <div className="titel-box">
                                    <h6>Campagne de vaccination</h6>
                                </div>
                                <div className="content-box">
                                    <p>
                                        Notre hôpital organise une campagne de vaccination contre la grippe saisonnière.
                                        Inscrivez-vous dès maintenant pour protéger votre santé et celle de vos proches.
                                        <Link to={'/'}>
                                            <button className="badge btn-primary" style={{backgroundColor: "#17a2b8"}}>
                                                Inscription
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                                <div className="links-box">
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className={'main-box'}>
                                <div className={'titel-box'}>
                                    <h6>Heures de visite modifiées</h6>
                                </div>
                                <div className={'content-box'}>
                                    <p>
                                        En raison de la situation sanitaire actuelle, les heures de visite ont été modifiées. Veuillez consulter les nouvelles heures avant de rendre visite à un patient.
                                        <Link to={'/'}>
                                            <button className={'badge btn-primary '}
                                                    style={{"backgroundColor": "#17a2b8"}}>
                                                Voir les horaires
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                                <div className={'links-box'}>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
        </div>
    )
}

export default Anounces