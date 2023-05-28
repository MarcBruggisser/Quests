import { deleteQuestApi } from '../../functions/QuestsFunctions';
import {NavLink} from "react-router-dom";
import trash from '../../assets/img/trash.svg';

export default function Quest( props ) {

  const modifyQuest = (e) => {
    let quete = e.target.closest(".quest")
    // let dataQuete = quete.getAttribute("data");
    // Mettre des inputs pour pouvoir changer la valeur du titre et de la description
  }
  const deleteQuest = (e) => {
    let quete = e.target.closest(".quest"); quete.remove();
    let dataQuete = [quete.getAttribute("data-id")];

    deleteQuestApi(dataQuete);
  }

  return (
    <li className='quest' data-id={props.idQuest} data-universe={props.universe}>
      <NavLink to={`/quete/${props.idQuest}`}>Quête</NavLink>
      <strong>{props.name}</strong>
      <p>{props.description}</p>
      <span className="modify_quest" onClick={modifyQuest}>Modifier la quête</span>
      <img src={trash} className="delete_quest" alt="suppression_quete" onClick={deleteQuest} />
    </li>
  )
}