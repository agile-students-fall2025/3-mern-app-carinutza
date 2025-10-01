import axios from 'axios'
import './AboutMe.css'

let aboutData = null

axios.get('http://localhost:5002/aboutus')
  .then(response => {
    aboutData = response.data.data
    console.log('Fetched data')
  })
  .catch(err => {
    console.error(err)
  })

const AboutMe = props => {
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

export default AboutMe