import React, { useState, useEffect } from 'react'
import axios from 'axios'

const NaytettavatKielet = ( {kielet} ) => {
  const kieletLista = []
  for (const key in kielet) {
    kieletLista.push(kielet[key])
  }
  return (
    <ul>
      {kieletLista.map(kieli =>
        <li key={kieli}>
          {kieli}
        </li>
      )}
    </ul>
  )
}

const NaytettavatMaat = ( {maat, haku} ) => {
  const naytettavatMaat = maat.filter(maa => maa.name.common.toLowerCase().includes(haku.toLowerCase()))

  if (haku === '' || naytettavatMaat.length <= 0) {
    return (
      <ul>
        {maat.map(maa =>
          <li key={maa.name.common}>
            {maa.name.common}
          </li>
        )}
      </ul>
    )
  } else if (naytettavatMaat.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (naytettavatMaat.length > 1) {
    return (
      <ul>
        {naytettavatMaat.map(maa =>
          <li key={maa.name.common}>
            {maa.name.common}
          </li>
        )}
      </ul>
    )
  } else {
    return (
      <div>
        <h1>{naytettavatMaat[0].name.common}</h1>
        <div>capital {naytettavatMaat[0].capital}</div>
        <div>population {naytettavatMaat[0].population}</div>
        <h1>languages</h1>
        <NaytettavatKielet kielet={naytettavatMaat[0].languages} />
        <img src={naytettavatMaat[0].flags.png} alt={'rikki'} />
      </div>
    )
  }
}

const App = () => {
  const [maat, asetaMaat] = useState([])
  const [haku, asetaHaku] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        asetaMaat(response.data)
      })
  }, [])
  console.log('render', maat.length, 'maata haettu')

  const handleHaku = (event) => {
    console.log(event.target.value)
    asetaHaku(event.target.value)
  }
    
  return (
    <div>
      find countries
      <input
        value={haku}
        onChange={handleHaku} />
      <NaytettavatMaat maat={maat} haku={haku} />
    </div>
  );
}

export default App;