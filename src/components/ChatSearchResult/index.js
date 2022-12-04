import Contact from "@components/Contact";
import { getTime } from "@utils/helperFunctions";
import "./ChatSearchResult.css";

function ChatSearchResult({ data, cancelSearch }) {
  return (
    <div className="chat-result">
      <section>
        {data.contacts.length > 0 && (
          <div
            role="button"
            className="search-result-container chat-result__contact__container"
          >
            <h3>Contacts</h3>
            {data.contacts.map((contact) => (
              <div className="chat-result__contact" key={contact.contact.id}>
                <Contact {...contact} />
              </div>
            ))}
          </div>
        )}

        {data.chats.length > 0 && (
          <div className="search-result-container chat-result__chat__container">
            <h3>Chats</h3>

            {data.chats.map((chat) => (
              <div
                role="button"
                className="chat-result__chat"
                onClick={chat.onClick}
                key={chat.id}
              >
                <header>
                  <h4>{chat.name}</h4>
                  <span>{getTime(chat.time)}</span>
                </header>
                <main>
                  <p>{chat.textMsg}</p>
                </main>
              </div>
            ))}
          </div>
        )}

        {data.chats.length === 0 && data.contacts.length === 0 && (
          <div className="chat-result__empty">
            <h4>No results found</h4>
          </div>
        )}
      </section>
    </div>
  );
}

export default ChatSearchResult;
