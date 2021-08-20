import { expect } from 'chai';
import { SampleClass } from '../models/sample-class';

describe('Testing SampleClass getName Method', () => {
	it('should return "I am a sampleClass"', () => {
		const sampleClass: SampleClass = new SampleClass();
		const myNameResult: string = sampleClass.getName();
		expect(myNameResult).to.equal('I am a sampleClass');
	});
});
