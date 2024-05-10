import './styles/AboutPage.css'
import {YMaps, Map, Placemark} from '@pbe/react-yandex-maps';
import React from "react";
import aboutTeamImages from "../../utils/about/aboutTeamImages";
import AboutCard from "./components/AboutCard";
import aboutTechnologies from "../../utils/about/aboutTechnologies";
import aboutPlacemarksOptions from "../../utils/about/aboutPlacemarksOptions";

const AboutPage = () => {

    return(
        <div className="container">
            <div className="about-our-company">
                <div className="about-our-company__title">Russian Spotify</div>
                <div className="about-our-company__description">
                    This page is about how our <br /> team created a product similar to Spotify
                </div>
            </div>
            <div className="about-us-photo">
                <h2 className="about-us-photo__title">Our team</h2>
                <div className="about_us_photos">
                    {
                        aboutTeamImages?.map((team, index) => (
                            <AboutCard
                                image={team.img}
                                title={team.title}
                                key={index}
                                width={team.width}
                                height={team.height}
                            />))
                    }
                </div>
            </div>
            <div className="about-description">
                <h3>What is this project about?</h3>
                <p>
                    Our team, which has developed a project similar to Spotify within the framework of our course "Corporate Development on .NET," is dedicated to innovating in the world of music streaming content. We pay special attention to technological trends and developing skills in .NET programming to offer our users an innovative online music experience.
                    Our project combines technical mastery with an understanding of user needs. We use cutting-edge tools and technologies such as ASP.NET, C#, Entity Framework, and PostgresSQL to create a convenient and functional platform for streaming music, audiobooks, and podcasts.
                    We are confident that our project includes all the necessary features to meet our users' demands: from registration and authentication to account management, playlist creation, and personalized recommendations. We strive not only for technical excellence but also for providing a high level of security and user convenience on our platform.
                    Our team takes pride in the ability to deliver a music experience that meets the highest quality standards and satisfies our users' needs. We are focused on continually developing and improving our product to remain leaders in the online music and entertainment sphere.
                </p>
            </div>
            <div className="about-stack">
                <h3>What we used?</h3>
                <div className="about-stack__technologies">
                    {
                        aboutTechnologies?.map((technology, index) => (
                            <AboutCard
                                image={technology.image}
                                title={technology.name}
                                width={technology.width}
                                height={undefined}
                                key={index}/>
                        ))
                    }
                </div>
            </div>
            <div className="about-map">
                <div className="map">
                    <h4>Where are we?</h4>
                    <YMaps
                        enterprise
                        query={
                            {
                                apikey: "745d6725-4849-4d98-a32b-942c84d144d0",
                                mode: "release",
                            }
                        }>
                        <Map
                            defaultState={{
                                type: 'yandex#map',
                                center: [55.743938, 49.180956],
                                zoom: 10 }}
                            width={'100%'}
                            height={'100%'}>
                            {
                                aboutPlacemarksOptions.map((option) => (
                                    <Placemark
                                        geometry={option.geometry}
                                        options={{
                                            iconLayout: "default#image",
                                            iconImageSize: [50, 50],
                                            iconImageHref: option.icon
                                        }}
                                    />
                                ))
                            }
                        </Map>
                    </YMaps>
                </div>
            </div>
            <div className="about-footer">

            </div>
        </div>
    )
}

export default AboutPage;
