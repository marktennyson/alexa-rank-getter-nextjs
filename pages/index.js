import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import React from "react"

export default function Home() {
  const router = useRouter();
  const [domainName, setDomainName] = React.useState("")
  const [domainData, setDomainData] = React.useState(null);

  function submitForm(domain) {
    const url = `/api/getrank?domain=${domainName}`;
    fetch(url, {
      method: "get",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((response) => {
        setDomainData(response);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Get Your Alexa Rank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Get Your Website's{" "}
          <a href="https://alexa.com" target="_blank">
            Alexa Rank
          </a>
        </h1>

        <p className={styles.description}>
          Enter your{" "}
          <span className={styles.websiteColour}>website/domain name</span> on
          the below given box.
        </p>

        <div className={styles.grid}>
          <input
            type="text"
            name="domainName"
            className={styles.domainInput}
            placeholder="your domain name"
            value={domainName}
            onChange={e => setDomainName(e.target.value)}
          ></input>
          <br></br>
          <br></br>
          <button
            className={styles.domainSubmit}
            onClick={() => submitForm(domainName)}
          >
            Submit
          </button>
        </div>
        {domainData ? <div>
          Website Rank: {domainData.alexa_rank}
        </div> : null}
      </main>
    </div>
  );
}
