use wasm_bindgen::prelude::*;

// #[wasm_bindgen]
fn create_state(element: &str) -> Result<Box<dyn Fn(&str) -> ()>, &str> {
  let window = web_sys::window().expect("Cannot create a state without window");
  let document = window
    .document()
    .expect("Cannot create a state without document");
  let maybe_html_element = document
    .query_selector(element)
    .expect("Element did not found!");
  let html_element = match maybe_html_element {
    Some(html) => html,
    None => return Err("Html element"),
  };

  let set_state = Box::new(move |value: &str| {
    html_element.set_inner_html(value);
  });
  return Ok(set_state);
}

#[wasm_bindgen]
pub fn run() -> Result<(), JsValue> {
  let window = web_sys::window().expect("no global window found");
  let document = window.document().expect("no document found");

  let root = document.query_selector("#root").expect("no root found");

  match root {
    Some(el) => {
      el.set_inner_html("<h1>Hello Table Sizes!</h1>");
    }
    None => return Err(JsValue::UNDEFINED),
  }
  let set_count = create_state("root").expect("Not found");
  set_count("<h1>Hello World!!</h1>");
  return Ok(());
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b + 5;
}
