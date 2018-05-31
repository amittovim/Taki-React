class Card {
    id;
    container;
    color;
    number;
    action;
    isHidden;
    element;

    constructor(id, container, color, number, action, isHidden, element) {
        this.id = id;
        this.container = container;
        this.color = color;
        this.number = number || null;
        this.action = action || null;
        this.isHidden = isHidden || true;
        this.element = element;
    }
}
