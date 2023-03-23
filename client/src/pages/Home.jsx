import QuestList from "../composants/QuestList/QuestList"
import QuestManager from "../composants/QuestManager/QuestManager"
import SideNav from "../composants/SideNav/SideNav"

export default function Home() {
    return (
        <>


            <main className="homepage">

                <SideNav />

                <div className="content">

                    <section className="title">
                        <h1>Magic quests</h1>
                    </section>

                    <section className="quests_container">
                        <QuestManager />
                        
                        <QuestList />      
                    </section>

                </div>
            </main>

        </>
    )
}
