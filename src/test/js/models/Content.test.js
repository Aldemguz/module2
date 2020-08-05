import React from 'react';
import {Content} from 'bucares/models/Content';

describe('Content model Test', () => {

  it('Model Content', () => {
    const text = "test";
    const content = new Content({ url: text, word: text });

    expect(content.url).toBe(text);
    expect(content.word).toBe(text);
  });

  it('Model Content with default data', () => {
    const text = "";
    const content = new Content({});
    
    expect(content.url).toBe(text);
    expect(content.word).toBe(text);
  });
});