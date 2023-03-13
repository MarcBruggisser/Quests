import axios from 'axios';
import {NavLink} from "react-router-dom";
import trash from '../../assets/img/trash.svg';

export default function Quest( props ) {

  const modifyQuest = (e) => {
    let quete = e.target.closest(".quest")
    // let dataQuete = quete.getAttribute("data");
    // Mettre des inputs pour pouvoir changer la valeur du titre et de la description
  }
  const deleteQuest = (e) => {
    let quete = e.target.closest(".quest");
    let dataQuete = quete.getAttribute("data");

    axios.delete(`http://localhost:3000/api/quests/${dataQuete}`)
      .then( () => { console.log("Quête supprimée"); quete.remove(); })
      .catch( ( console.log("Erreur")) )
  }

  return (
    <li className='quest' data={props.idQuest} data-univers={props.univers}>
      <NavLink to={`/quete/${props.idQuest}`}>Quête</NavLink>
      <strong>{props.name}</strong>
      <p>{props.description}</p>
      <span className="modify_quest" onClick={modifyQuest}>Modifier la quête</span>
      <img src={trash} className="delete_quest" alt="suppression_quete" onClick={deleteQuest} />
    </li>
  )
}