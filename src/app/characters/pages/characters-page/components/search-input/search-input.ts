import { JsonPipe } from '@angular/common';
import { Component, effect, input, linkedSignal, output } from '@angular/core';

@Component({
  selector: 'search-input',
  imports: [],
  templateUrl: './search-input.html',
})
export class SearchInput {
  placeholder = input('Buscar');
  initialValue = input<string>();

  value = output<string>();

  inputValue = linkedSignal<string>(() => this.initialValue() ?? '');

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();

    console.log('value', value);

    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 1000);

    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
