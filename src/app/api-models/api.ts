
// CLIENT <=> SERVER API'S

interface function requestMoveCard(card: Card): {
    accept => ok + updated state delta
    reject => not ok (illegal move)
}

