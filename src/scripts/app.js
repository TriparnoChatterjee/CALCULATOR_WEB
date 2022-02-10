  /**
   * Class to assist in rendering 
   * calculations
   */
class DOMHelper {
  /**
   * 
   * @param {DOMElement} field - A field to render 
   * @param {String} textToBeRendered - Text to be rendered
   */
  render(field, textToBeRendered) {
 
    field.innerHTML = `
    <p class="font-semibold flex justify-end p-2 text-white">
      ${textToBeRendered}
    </p>
    `;
  }
  renderAfterEqualFormat(field, textToBeRendered) {
    field.innerHTML = `
    <p class="font-semibold flex justify-end  p-2 text-white text-3xl">
      ${textToBeRendered}
    </p>
    `;
  }
}
/**
 * Class that assist in calculation also inherits the DOMHelper class
 */
class CalculationHelper extends DOMHelper {

  constructor(params) {
    super();
    this.expression = "";
  }
  /**
   * Replaces the user readable trigonometric function to JS understandable code
   */
  trigonometricExpressionReplacer() {
    if (this.expression.includes("sin")) {
      this.expression = this.expression.replaceAll(
        "sin(",
        "Math.sin((Math.PI/180)*"
      );
    }
    if (this.expression.includes("cos")) {
      this.expression = this.expression.replaceAll(
        "cos(",
        "Math.cos((Math.PI/180)*"
      );
    }
    if (this.expression.includes("tan")) {
      this.expression = this.expression.replaceAll(
        "tan(",
        "Math.tan((Math.PI/180)*"
      );
    }
  }
  /**
   * 
   * @param {DOMElement} field - takes the field where the expression lies and clears it 
   */
  clearExpression(field) {
    this.expression = "";
    this.render(field, this.expression);
  }
  /**
   * 
   * @param {DOMElement} resultField  - field to render the result
   * @param {DOMElement} expressionField - field to render the expression
   * @param {String} originExpression - the expression to be evaluated
   * Evaluates the expression and renders the result
   */
  expressionEvaluationHandler(resultField, expressionField, originExpression) {
    try {
      this.result = eval(this.expression.toString()).toFixed(4);
    } catch (error) {
      this.result = "";
    }

    this.render(resultField, this.result);
    this.render(expressionField, originExpression);
  }
  /**
   * 
   * @param {DOMElement} resultField - field to render the result
   * @param {DOMElement} expressionField - field to render the expression
   * Renders only the final result
   */
  equalEvaluationHandler(resultField, expressionField) {
    var originalExpression = this.expression;
    this.trigonometricExpressionReplacer();
    this.expression = eval(this.expression).toFixed(4);
    this.result = "";
    this.render(resultField, this.result);
    this.renderAfterEqualFormat(expressionField, this.expression);
  }
  /**
   * 
   * @param {DOMElement} expressionField - Field where the expression is 
   * Modifies the expression by removing the last character
   */
  backSpaceHandler(expressionField) {
    this.expression = this.expression.substring(0, this.expression.length - 1);
    this.render(expressionField, this.expression);
  }
}

/**
 * Class which deals with the buttons involved in Calc 
 * This class inherits the CalculationHelper class 
 */
class CalculatorKeysAndFields extends CalculationHelper {
  constructor(params) {
    super();
    //Fields
    this.resultField = document.querySelector("#result-field");
    this.expressionField = document.querySelector("#expression-field");

    const point = document.querySelector("#point");
    const zero = document.querySelector("#zero");
    const multiply = document.querySelector("#multiply");
    const seven = document.querySelector("#seven");
    const eight = document.querySelector("#eight");
    const nine = document.querySelector("#nine");
    const subtract = document.querySelector("#subtract");
    const four = document.querySelector("#four");
    const five = document.querySelector("#five");
    const six = document.querySelector("#six");
    const addition = document.querySelector("#addition");
    const one = document.querySelector("#one");
    const two = document.querySelector("#two");
    const three = document.querySelector("#three");
    const division = document.querySelector("#division");
    const openParenthesis = document.querySelector("#open-parenthesis");
    const closeParenthesis = document.querySelector("#close-parenthesis");
    const doubleZero = document.querySelector("#double-zero");
    const modulus = document.querySelector("#modulo");

    // trigonometric buttons
    const sin = document.querySelector("#sine");
    const cos = document.querySelector("#cosine");
    const tan = document.querySelector("#tangent");

    //cta buttons
    this.clear = document.querySelector("#clear");
    this.equal = document.querySelector("#equal");
    this.backSpace = document.querySelector("#backspace");

    this.buttonsNumerics = [
      point,
      zero,
      seven,
      eight,
      nine,
      four,
      five,
      six,
      one,
      two,
      three,
      doubleZero,
    ];
    this.operators = [
      multiply,
      subtract,
      addition,
      division,
      openParenthesis,
      closeParenthesis,
      modulus,
    ];
    this.trigonometricButtons = [sin, cos, tan];

    // this.expression = "";
  }
  /**
   * 
   * @param {DOMElement} numericButtonType - A Button is passed 
   * The expression that we want to evaluate is formed here
   */
  formExpression(numericButtonType) {
    var expressionToBeEvaluated = "";
    if (
      numericButtonType.textContent === "sin" ||
      numericButtonType.textContent === "cos" ||
      numericButtonType.textContent === "tan"
    ) {
      this.expression = this.expression + numericButtonType.textContent + "(";
    } else {
      this.expression = this.expression + numericButtonType.textContent;
    }
    this.expression = this.expression.replace("X", "*");
    var originalExpression = this.expression;
    this.trigonometricExpressionReplacer();
    this.expressionEvaluationHandler(
      this.resultField,
      this.expressionField,
      originalExpression
    );

    this.expression = originalExpression;
    console.log(this.expression);
  }
  /**
   * Function to handle the event when EQUAL Button is pressed
   */
  equalEvent() {
    this.equalEvaluationHandler(this.resultField, this.expressionField);
  }
  /**
   * Function to handle the event when CLEAR Button is pressed
   */
  clearEvent() {
    this.clearExpression(this.expressionField);
  }
  /**
   * Function to handle the event when BACKSPACE Button is pressed
   */
  backSpaceEvent() {
    this.backSpaceHandler(this.expressionField);
  }
  /**
   * Function to handle the event any Trigonometric Button is pressed
   */
  trigonometricEvent(operation) {
    this.expression = operation + "(";
    this.render(this.expressionField, this.expression);
  }
  /**
   * Add Event Listeners to All Buttons
   */
  addEventHandlers() {
    for (const numerics of this.buttonsNumerics) {
      numerics.addEventListener(
        "click",
        this.formExpression.bind(this, numerics)
      );
    }
    for (const operations of this.operators) {
      operations.addEventListener(
        "click",
        this.formExpression.bind(this, operations)
      );
    }
    for (const trigo of this.trigonometricButtons) {
      trigo.addEventListener("click", this.formExpression.bind(this, trigo));
    }
    this.equal.addEventListener("click", this.equalEvent.bind(this));
    this.clear.addEventListener("click", this.clearEvent.bind(this));
    this.backSpace.addEventListener("click", this.backSpaceEvent.bind(this));
  }
}
/**
 * The Start of the Application 
 */
class App {
  /**
   * App initial Execution path
   */
  static init() {
    const keysAndFields = new CalculatorKeysAndFields();
    keysAndFields.addEventHandlers();
  }
}

App.init();
