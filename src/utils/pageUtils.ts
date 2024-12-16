import { Locator, Page } from "@playwright/test";


export async function clickAndFill(locator: Locator, input:string) {
    await locator.click();
    await locator.fill(input)
}