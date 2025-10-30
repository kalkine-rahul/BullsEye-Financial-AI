import { useState } from 'react';

export default function FAQSection() {
  const [openItems, setOpenItems] = useState([0]); // Start with first item open

  const toggleItem = (index) => {
    if (openItems.includes(index)) {
      setOpenItems(openItems.filter(item => item !== index));
    } else {
      setOpenItems([...openItems, index]);
    }
  };

  const faqs = [
    {
      question: "What is a stock screener?",
      answer: "Stock screener is a tool that an investor or trader uses, to select the stocks according to their preferences from the various stocks available. This is done by filtering out the stocks based on P/E ratio, 52 week price change percentage, market capitalization, CAGR, net sales etc. One can use multiple filters in ticker stock screener. The more filters used, the fewer stocks appear. This helps the investor to select the most feasible stock."
    },
    {
      question: "Which is the best stock screener?",
      answer: "Ticker is the best free stock screener among all the others available. Most screeners available either charge for the services or, even if free, do not provide as much information necessary. Ticker has more than 1200 ratios that an investor can choose from, to filter out the stocks. It also provides smart suggestions as one types the ratios. Ticker stock screener is equipped with pre-created sample screens and description of the calculated ratios, that an amateur investor can take full advantage of. TickerPlus provides exclusive features like assorted bundles, valuation techniques and other special features like common size statements, smart portfolio, list of upcoming IPOs, con calls and presentations etc."
    },
    {
      question: "Is there a free stock screener?",
      answer: "Yes. There are few free stock screeners provided by various websites. But those are complicated to use and do not provide multiple features. Ticker is the latest and the most efficient free screener. Built with the simplest user interface, Ticker is the best stock screener for both amateur and experienced investors."
    },
    {
      question: "How do you use a stock screener?",
      answer: "The process of using ticker stock screener is quite simple. For an active investor who is well aware of the financial analysis, Stock screener gives an option to customise. A stock screener usually has three components: a database of companies, a set of variables and a screening engine that matches the former two components to produce results. One can go on to the screener, enter the criteria of their preference, for example, market cap>100 million. The companies that fit the criteria are displayed. One can enter more than one variable."
    },
    {
      question: "How does Ticker stock screener work?",
      answer: (
        <>
          <p>Using Ticker is the simplest. A user can follow the below mentioned steps to use the Ticker:</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>The investor can type in the required ratio name and the ratios. As they type, smart suggestions are displayed from which the investor can choose. Ticker has more than 1200 ratios available. Multiple ratios can be added by using "AND" and "OR".</li>
            <li>Once the investor finishes typing in the queries, clicking on "run query" will list the various companies that fit the criteria.</li>
            <li>The investor can then analyse the various alternatives listed and choose the most feasible one.</li>
          </ul>
          <p className="mt-2">Ticker offers pre-created screens that one can use. Ticker also provides "bundles", a collection of stocks under various categories that a user can directly look into.</p>
        </>
      )
    },
    {
      question: "How do you find good stocks with a screener?",
      answer: "Among other criteria, fundamental analysis is one major factor used to find good stocks with a screener. The usually preferred criteria are EPS increasing for a period of 5 years, debt to equity less than 1, ROE > 15%, price to earning ratio must be lower compared to competitors, current ratio > 1 and dividends showing an increasing trend. Ticker provides the information regarding all the above mentioned ratios."
    },
    {
      question: "How do you screen a stock in India?",
      answer: "For screening stocks in India, fundamental analysis is most crucial. Few ratios considered are earnings per share (EPS), debt to equity ratio, price to earning ratio, return on equity (ROE), current ratio and dividend. Ticker screener provides the information regarding all the above mentioned ratios and more."
    },
    {
      question: "What are the benefits of a stock screener?",
      answer: "Stock screeners provide various benefits to an investor/trader. They are cost and time efficient. All the required information is available at one click. They provide the current updated information. They also tend to eliminate any emotional biases. It helps the investor make rational decisions as the filters available are quantitative in nature. Also, an investor does not have to be well versed with advanced financial analysis. Ticker provides pre-created screens which can be used to select stocks."
    },
    {
      question: "How do you set stock screeners for day trading?",
      answer: "There are a few factors to be considered for day trading. Stocks that are the most liquid are preferable as they are available in large quantities and can be traded on without affecting the price significantly. Quick ratio on Ticker would help one find liquid stocks. Volatile stocks are another type which are feasible. Medium to high volatility are good for the investor to earn profits."
    },
    {
      question: "How do you use a screener for finding good penny stocks?",
      answer: "Penny stocks are stocks that trade at a low price and also have a very low market capitalization. These stocks are generally not traded on, by active traders/investors as they are illiquid. On Ticker screener, one can screen the penny stock by using market capitalization ratio (MCAP)."
    }
  ];

  return (
    <div className="mt-2">
      <div className="mb-8">
      <h3 className="text-2xl font-bold text-blue-900">Frequently Asked Questions</h3>
        <p className="mt-2 text-gray-600">Find answers to common questions that come in your mind related to screener.</p>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
            <div 
              className="flex justify-between items-center p-4 bg-white cursor-pointer"
              onClick={() => toggleItem(index)}
            >
              <h5 className="font-medium text-gray-800">{faq.question}</h5>
              <svg 
                className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                  openItems.includes(index) ? 'rotate-180' : ''
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ${
                openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                {typeof faq.answer === 'string' ? (
                  <p className="text-gray-600">{faq.answer}</p>
                ) : (
                  <div className="text-gray-600">{faq.answer}</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}