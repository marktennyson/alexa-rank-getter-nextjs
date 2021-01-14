import Head from 'next/head'
import styles from '../styles/Home.module.css'

function submitForm(domain){
  const url = `api/getrank?domain=${domain}`
  fetch(url, {
    method: 'get',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
  }).then((res) => {
    if(res.status === 200){return res;}
  })
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Get Your Alexa Rank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Get Your Website's <a href="https://alexa.com" target="_blank">Alexa Rank</a>
        </h1>

        <p className={styles.description}>
          Enter your <span className={styles.websiteColour}>website/domain name</span> on the below given box.
        </p>

        <div className={styles.grid}>
          <form>
            <input type="text" name="domainName" className={styles.domainInput} placeholder="your domain name"></input><br></br><br></br>
            <input type="submit" className={styles.domainSubmit} onsubmit={submitForm()}></input>
          </form>
        </div>
      </main>
    </div>
  )
}
