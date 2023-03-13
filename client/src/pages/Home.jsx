import Header from '../composants/Header/Header'
import QuestList from "../composants/QuestList/QuestList"
import QuestManager from "../composants/QuestManager/QuestManager"

export default function Home() {
    return (
        <>
            <Header />

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
