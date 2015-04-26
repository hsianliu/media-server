function View() {
    this.el = document.createElement('div');
}

View.prototype.template = '<span>You need to override me</span>';

View.prototype.render = function() {
    this.el.innerHTML = this.template;
};

module.exports = View;
