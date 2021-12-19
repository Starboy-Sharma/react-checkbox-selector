import './App.css';
import { useEffect, useState } from 'react';

function App() {

    const [preferences, setPreferences] = useState([

      { name: 'Party', selected: false },
      { name: 'Rocks', selected: false },
      { name: 'Love', selected: false },
      { name: 'Sufi', selected: false },
    ]);

    const [allFav, setAllFav] = useState(false);

    function handleSelectAll(e) {
      
      const { checked } = e.target;

      let updatedPreference = [...preferences];

      if (checked) {

        updatedPreference.map(preference => preference.selected = true);
        setAllFav(true);
        setPreferences(updatedPreference);
      } else {
        updatedPreference.map(preference => preference.selected = false);
        setAllFav(false);
        setPreferences(updatedPreference);
      }

    }

    function handleonChange(e, genre) {
      
      const { checked } = e.target;

      let updatedPreference = [...preferences];
      const index = updatedPreference.findIndex(preference => preference.name === genre);

      if (index === -1) {
        console.error('Preference is not found');
        return;
      }

      if (checked) {
        updatedPreference[index].selected = true;
      } else {
        updatedPreference[index].selected = false;
      }

      // update state
      setPreferences(updatedPreference);

    }

    // check preferences are updated then we will check if all check box are selected then mark select all else mark false
    useEffect(() => {

      // we also check if all items are selected
      let allChecked =  preferences.every(preference => preference.selected === true);
      
      setAllFav(allChecked);
      
    }, [preferences])


  return (
    <div className="App">
      

    <form>

      <p> Choose your music interests </p>

      <div className="form-control">

        <label>
          <input type="checkbox" onChange={e => handleSelectAll(e)} checked={allFav} />
          Select your music interest
        </label>

      </div>

      {preferences.map(preference => 

        <div className="form-control" key={preference.name} >
          <label>
            <input 
              type="checkbox"
              onChange={e => handleonChange(e, preference.name)}
              checked = {preference.selected}
            />
            { preference.name }
          </label>
        </div>

      )}

    </form>

    </div>
  );
}

export default App;
