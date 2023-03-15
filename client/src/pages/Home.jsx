import QuestList from "../composants/QuestList/QuestList"
import QuestManager from "../composants/QuestManager/QuestManager"

export default function Home() {
    return (
        <>

            <section className="title">
                <h1>Magic quests</h1>
            </section>

            <section className="quests_container">
                <QuestManager />
                
                <QuestList />      
            </section>
        </>
    )
}
