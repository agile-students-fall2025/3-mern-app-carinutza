import axios from 'axios'
import './AboutMe.css'
import { useState, useEffect } from "react";

const AboutMe = props => {
  const [aboutData, setAboutData] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:5002/aboutus')
    .then(response => {
      setAboutData(response.data.data)
      // aboutData = response.data.data
      console.log('Fetched data')
    })
    .catch(err => {
      console.error(err)
    })
    console.log("Count updated:", aboutData);
  }, []);
  if (aboutData != null){
    return (
      <article className="About-article">
        <h1>{aboutData.title}</h1>
        <img src={aboutData.imageUrl} alt="Carina-Ana-Maria Ilie" className="About-photo" />
        {aboutData.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>
    )
  }
  else{
    return <>Loading data...</>
  }
}

export default AboutMe