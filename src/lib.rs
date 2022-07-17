use wasm_bindgen::prelude::*;

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
  return Ok(());
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b + 5;
}
