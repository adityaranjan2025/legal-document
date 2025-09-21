// Legal Document AI - JavaScript Application
class LegalDocumentAI {
    constructor() {
        this.sampleDocuments = [
            {
                title: "Rental Agreement Clause",
                text: "The Tenant shall pay the Landlord a security deposit equal to one month's rent prior to occupancy. Said deposit shall be held in trust by the Landlord and may be applied toward any damages to the premises beyond normal wear and tear, unpaid rent, or other charges owed by the Tenant under this Agreement. The deposit, or balance thereof, shall be returned within thirty (30) days after termination of tenancy, provided the premises are in good condition and all obligations have been satisfied."
            },
            {
                title: "Employment Contract Section",
                text: "Employee acknowledges that during the course of employment, Employee may have access to and become acquainted with various trade secrets, inventions, innovations, processes, information, records and specifications owned or licensed by the Company. Employee agrees that Employee will not disclose any of the aforesaid, directly or indirectly, or use any of them in any manner, either during the term of employment or at any time thereafter, except as required in the course of employment with the Company."
            },
            {
                title: "Terms of Service Excerpt",
                text: "BY ACCESSING OR USING THIS SERVICE, YOU AGREE TO BE BOUND BY THESE TERMS. IF YOU DISAGREE WITH ANY PART OF THE TERMS THEN YOU MAY NOT ACCESS THE SERVICE. We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days notice prior to any new terms taking effect."
            }
        ];

        this.legalTerms = {
            "security deposit": "Money paid upfront to protect the landlord against damages or unpaid rent",
            "trade secrets": "Confidential business information that gives a competitive advantage",
            "sole discretion": "Complete freedom to make decisions without needing approval",
            "material revision": "Significant changes that substantially affect your rights or obligations",
            "normal wear and tear": "Expected deterioration from regular use, not tenant's fault",
            "tenant": "Person who rents and occupies property owned by someone else",
            "landlord": "Property owner who rents out their property to tenants",
            "termination of tenancy": "The end of a rental agreement between landlord and tenant",
            "premises": "The specific property or building being rented",
            "employee": "Person who works for a company under an employment agreement",
            "confidential information": "Private business information that must be kept secret",
            "non-disclosure": "Legal obligation to keep certain information private"
        };

        this.processingMessages = [
            "Initializing analysis...",
            "Analyzing legal language...",
            "Extracting key terms...",
            "Identifying document structure...",
            "Generating plain English summary...",
            "Preparing insights and recommendations...",
            "Finalizing analysis results..."
        ];

        this.currentMessageIndex = 0;
        this.init();
    }

    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupApplication();
            });
        } else {
            this.setupApplication();
        }
    }

    setupApplication() {
        this.bindEvents();
        this.populateSampleDocuments();
        this.updateCharacterCount();
        console.log('Legal Document AI initialized');
    }

    bindEvents() {
        // Get elements
        const legalText = document.getElementById('legal-text');
        const fileUploadBtn = document.getElementById('file-upload-btn');
        const sampleTextBtn = document.getElementById('sample-text-btn');
        const analyzeBtn = document.getElementById('analyze-btn');
        const closeSamplesBtn = document.getElementById('close-samples');
        const samplesModal = document.getElementById('samples-modal');
        const printBtn = document.getElementById('print-btn');
        const copyBtn = document.getElementById('copy-btn');
        const clearBtn = document.getElementById('clear-btn');
        const fileInput = document.getElementById('file-input');

        // Text area events
        if (legalText) {
            legalText.addEventListener('input', () => {
                this.updateCharacterCount();
                this.toggleAnalyzeButton();
            });
            legalText.addEventListener('paste', () => {
                // Small delay to allow paste to complete
                setTimeout(() => {
                    this.updateCharacterCount();
                    this.toggleAnalyzeButton();
                }, 10);
            });
        }

        // Button events
        if (fileUploadBtn) {
            fileUploadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFileUpload();
            });
        }

        if (sampleTextBtn) {
            sampleTextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showSamplesModal();
            });
        }

        if (analyzeBtn) {
            analyzeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.analyzeDocument();
            });
        }

        // Modal events
        if (closeSamplesBtn) {
            closeSamplesBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.hideSamplesModal();
            });
        }

        if (samplesModal) {
            samplesModal.addEventListener('click', (e) => {
                if (e.target === samplesModal) {
                    this.hideSamplesModal();
                }
            });
        }

        // Results actions
        if (printBtn) {
            printBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.printResults();
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.copyResults();
            });
        }

        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearResults();
            });
        }

        // File input
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelection(e));
        }

        // Tab switching
        const tabButtons = document.querySelectorAll('.tab-button');
        tabButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const tabName = e.target.getAttribute('data-tab');
                if (tabName) {
                    this.switchTab(tabName);
                }
            });
        });

        console.log('Events bound successfully');
    }

    updateCharacterCount() {
        const legalText = document.getElementById('legal-text');
        const characterCountEl = document.querySelector('.character-count');
        
        if (legalText && characterCountEl) {
            const count = legalText.value.length;
            characterCountEl.textContent = `${count.toLocaleString()} characters`;
        }
    }

    toggleAnalyzeButton() {
        const legalText = document.getElementById('legal-text');
        const analyzeBtn = document.getElementById('analyze-btn');
        
        if (legalText && analyzeBtn) {
            const text = legalText.value.trim();
            analyzeBtn.disabled = text.length < 10; // Require minimum 10 characters
            
            if (text.length >= 10) {
                analyzeBtn.textContent = '🔍 Analyze Document';
            } else {
                analyzeBtn.textContent = 'Enter text to analyze';
            }
        }
    }

    handleFileUpload() {
        const fileInput = document.getElementById('file-input');
        if (fileInput) {
            fileInput.click();
        }
    }

    handleFileSelection(event) {
        const file = event.target.files[0];
        const legalText = document.getElementById('legal-text');
        
        if (file && legalText) {
            // Simulate file processing
            const fileName = file.name;
            const simulatedContent = `[File uploaded: ${fileName}]\n\nThis is a simulated file upload demonstrating the Legal Document AI functionality. In a real-world application, the actual file content would be extracted and processed here.\n\nFor demonstration purposes, please use the "Load Sample" button to test with real legal document examples, or paste your own legal text directly into this area.\n\nSupported file types: .txt, .pdf, .doc, .docx`;
            
            legalText.value = simulatedContent;
            this.updateCharacterCount();
            this.toggleAnalyzeButton();
            
            // Show notification
            this.showToast(`File "${fileName}" uploaded successfully!`);
        }
    }

    populateSampleDocuments() {
        const container = document.getElementById('sample-documents');
        if (!container) return;

        container.innerHTML = '';

        this.sampleDocuments.forEach((doc, index) => {
            const docElement = document.createElement('div');
            docElement.className = 'sample-doc';
            docElement.innerHTML = `
                <h4>${doc.title}</h4>
                <p>${doc.text.substring(0, 150)}...</p>
            `;
            docElement.addEventListener('click', () => this.loadSampleDocument(index));
            container.appendChild(docElement);
        });

        console.log('Sample documents populated');
    }

    showSamplesModal() {
        const modal = document.getElementById('samples-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            console.log('Samples modal shown');
        }
    }

    hideSamplesModal() {
        const modal = document.getElementById('samples-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            console.log('Samples modal hidden');
        }
    }

    loadSampleDocument(index) {
        const doc = this.sampleDocuments[index];
        const legalText = document.getElementById('legal-text');
        
        if (doc && legalText) {
            legalText.value = doc.text;
            this.updateCharacterCount();
            this.toggleAnalyzeButton();
            this.hideSamplesModal();
            
            // Show notification
            this.showToast(`Sample document "${doc.title}" loaded successfully!`);
            console.log('Sample document loaded:', doc.title);
        }
    }

    async analyzeDocument() {
        const legalText = document.getElementById('legal-text');
        if (!legalText) return;

        const text = legalText.value.trim();
        if (!text || text.length < 10) {
            this.showToast('Please enter at least 10 characters to analyze.');
            return;
        }

        console.log('Starting document analysis...');

        // Hide results and show processing
        this.hideResults();
        this.showProcessing();

        // Simulate AI processing with progress updates
        await this.simulateProcessing();

        // Generate and display results
        const results = this.generateResults(text);
        this.displayResults(results);

        // Hide processing and show results
        this.hideProcessing();
        this.showResults();

        console.log('Document analysis completed');
    }

    showProcessing() {
        const processingSection = document.getElementById('processing-section');
        if (processingSection) {
            processingSection.classList.remove('hidden');
            // Reset progress
            const progressFill = document.getElementById('progress-fill');
            if (progressFill) {
                progressFill.style.width = '0%';
            }
            console.log('Processing section shown');
        }
    }

    hideProcessing() {
        const processingSection = document.getElementById('processing-section');
        if (processingSection) {
            processingSection.classList.add('hidden');
            console.log('Processing section hidden');
        }
    }

    showResults() {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.remove('hidden');
            // Ensure summary tab is active
            this.switchTab('summary');
            console.log('Results section shown');
        }
    }

    hideResults() {
        const resultsSection = document.getElementById('results-section');
        if (resultsSection) {
            resultsSection.classList.add('hidden');
            console.log('Results section hidden');
        }
    }

    async simulateProcessing() {
        const progressFill = document.getElementById('progress-fill');
        const statusElement = document.getElementById('processing-status');

        if (!progressFill || !statusElement) return;

        this.currentMessageIndex = 0;

        for (let i = 0; i < this.processingMessages.length; i++) {
            const progress = ((i + 1) / this.processingMessages.length) * 100;
            progressFill.style.width = `${progress}%`;
            statusElement.textContent = this.processingMessages[i];
            
            console.log(`Processing step ${i + 1}: ${this.processingMessages[i]}`);
            
            // Random delay between 400-800ms for realistic feel
            await new Promise(resolve => setTimeout(resolve, Math.random() * 400 + 400));
        }
    }

    generateResults(text) {
        const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
        const documentType = this.identifyDocumentType(text);
        const extractedTerms = this.extractLegalTerms(text);
        const summary = this.generateSummary(text, documentType);
        const insights = this.generateInsights(text, documentType, wordCount);
        const actions = this.generateActionItems(text, documentType);

        console.log('Results generated:', { documentType, termCount: extractedTerms.length, wordCount });

        return {
            summary,
            terms: extractedTerms,
            insights,
            actions
        };
    }

    identifyDocumentType(text) {
        const lowerText = text.toLowerCase();
        
        if (lowerText.includes('tenant') || lowerText.includes('landlord') || lowerText.includes('rent') || lowerText.includes('deposit')) {
            return 'Rental Agreement';
        } else if (lowerText.includes('employee') || lowerText.includes('employment') || lowerText.includes('company') || lowerText.includes('trade secrets')) {
            return 'Employment Contract';
        } else if (lowerText.includes('terms') && lowerText.includes('service') || lowerText.includes('user') || lowerText.includes('accessing')) {
            return 'Terms of Service';
        } else if (lowerText.includes('privacy') || lowerText.includes('data') || lowerText.includes('personal information')) {
            return 'Privacy Policy';
        } else if (lowerText.includes('contract') || lowerText.includes('agreement')) {
            return 'Legal Contract';
        } else {
            return 'Legal Document';
        }
    }

    extractLegalTerms(text) {
        const foundTerms = [];
        const lowerText = text.toLowerCase();

        Object.keys(this.legalTerms).forEach(term => {
            if (lowerText.includes(term.toLowerCase())) {
                foundTerms.push({
                    term: term,
                    definition: this.legalTerms[term]
                });
            }
        });

        // Add contextual terms based on content
        const contextualTerms = [
            { term: 'shall', definition: 'Legal term meaning "must" or "is required to" - creates a mandatory obligation', keywords: ['shall'] },
            { term: 'hereby', definition: 'Legal term meaning "by this document" or "through this agreement"', keywords: ['hereby'] },
            { term: 'whereas', definition: 'Legal term used to introduce background information or conditions', keywords: ['whereas'] },
            { term: 'party', definition: 'A person or entity involved in a legal agreement or contract', keywords: ['party', 'parties'] },
            { term: 'obligation', definition: 'A legal duty or commitment that must be fulfilled', keywords: ['obligation', 'obligations'] }
        ];

        contextualTerms.forEach(contextTerm => {
            const hasKeyword = contextTerm.keywords.some(keyword => lowerText.includes(keyword));
            const notAlreadyIncluded = !foundTerms.find(t => t.term === contextTerm.term);
            
            if (hasKeyword && notAlreadyIncluded) {
                foundTerms.push({
                    term: contextTerm.term,
                    definition: contextTerm.definition
                });
            }
        });

        return foundTerms.slice(0, 8); // Limit to 8 terms for better UX
    }

    generateSummary(text, documentType) {
        const templates = {
            'Rental Agreement': `This rental agreement section explains important terms for your tenancy. Key points include security deposit requirements (typically one month's rent paid upfront), how deposits are held and returned, and conditions for getting your deposit back. The landlord can use your deposit to cover damages beyond normal wear and tear, unpaid rent, or other charges. You should get your deposit back within 30 days after moving out if you've met all requirements and left the property in good condition.`,
            
            'Employment Contract': `This employment contract section covers confidentiality and proprietary information. As an employee, you'll have access to company secrets, inventions, processes, and confidential information. You're legally required to keep all this information confidential during your employment and even after you leave the company. You cannot share, use, or disclose this information for any purpose other than your assigned job duties. Violation of these terms could result in legal action.`,
            
            'Terms of Service': `This terms of service section establishes the basic user agreement. By using the service, you automatically agree to follow all the stated terms and conditions. The company reserves the right to change these terms at any time at their sole discretion. For significant changes, they will try to provide at least 30 days advance notice. If you don't agree with any terms, you must stop using the service immediately.`,
            
            'Privacy Policy': `This privacy policy section explains how your personal information is collected, used, and protected. It outlines what data the organization collects, how they use it, who they share it with, and your rights regarding your personal information. Understanding these terms is crucial for knowing how your privacy is handled when using their services.`,
            
            'Legal Contract': `This legal contract establishes binding obligations and rights between the parties involved. It outlines specific terms, conditions, and requirements that must be followed. Each party has certain responsibilities and benefits under this agreement. Understanding these terms is essential before signing or agreeing to the contract.`,
            
            'Legal Document': `This legal document contains important provisions that establish rights, obligations, and legal relationships. The language is formal and precise to ensure enforceability. Key terms are specifically defined to avoid ambiguity. All parties should carefully review and understand these terms before proceeding, as they create binding legal commitments.`
        };

        return templates[documentType] || templates['Legal Document'];
    }

    generateInsights(text, documentType, wordCount) {
        const complexity = wordCount > 200 ? 'High' : wordCount > 100 ? 'Medium' : 'Low';
        const readingTime = Math.ceil(wordCount / 200);

        const insights = [
            {
                title: 'Document Type',
                content: `This appears to be a ${documentType} based on the language and terms used.`,
                status: 'info'
            },
            {
                title: 'Complexity Level',
                content: `${complexity} complexity - This document contains ${wordCount} words with ${complexity.toLowerCase()} legal complexity.`,
                status: complexity === 'High' ? 'high' : complexity === 'Medium' ? 'medium' : 'low'
            },
            {
                title: 'Reading Time',
                content: `Estimated reading time: ${readingTime} minute${readingTime !== 1 ? 's' : ''} for careful review.`,
                status: 'info'
            }
        ];

        // Add document-specific insights
        if (documentType === 'Rental Agreement') {
            insights.push({
                title: 'Financial Obligations',
                content: 'This document contains specific financial obligations including deposits and potential fees.',
                status: 'medium'
            });
        } else if (documentType === 'Employment Contract') {
            insights.push({
                title: 'Confidentiality Requirements',
                content: 'Strong confidentiality and non-disclosure obligations are present in this document.',
                status: 'high'
            });
        } else if (documentType === 'Terms of Service') {
            insights.push({
                title: 'Binding Agreement',
                content: 'By using the service, you automatically agree to these terms - no separate signature required.',
                status: 'medium'
            });
        }

        return insights;
    }

    generateActionItems(text, documentType) {
        const baseActions = [
            {
                title: 'Review Carefully',
                content: 'Read through the entire document carefully to understand all obligations and rights.',
                priority: 'high'
            },
            {
                title: 'Seek Legal Advice',
                content: 'Consider consulting with a lawyer if you have questions about any terms or implications.',
                priority: 'medium'
            }
        ];

        // Add document-specific actions
        if (documentType === 'Rental Agreement') {
            baseActions.push({
                title: 'Prepare Security Deposit',
                content: 'Ensure you have the required security deposit amount ready before occupancy.',
                priority: 'high'
            });
            baseActions.push({
                title: 'Document Property Condition',
                content: 'Take photos and document any existing damage before moving in to protect your deposit.',
                priority: 'medium'
            });
        } else if (documentType === 'Employment Contract') {
            baseActions.push({
                title: 'Understand Confidentiality Scope',
                content: 'Clearly understand what information is considered confidential and your ongoing obligations.',
                priority: 'high'
            });
            baseActions.push({
                title: 'Keep Personal Work Separate',
                content: 'Ensure any personal projects or ideas are clearly documented as separate from company work.',
                priority: 'medium'
            });
        } else if (documentType === 'Terms of Service') {
            baseActions.push({
                title: 'Monitor Term Changes',
                content: 'Stay informed about changes to terms that may affect your usage of the service.',
                priority: 'low'
            });
            baseActions.push({
                title: 'Understand Usage Rights',
                content: 'Be clear about what you can and cannot do while using the service.',
                priority: 'medium'
            });
        }

        return baseActions;
    }

    displayResults(results) {
        this.displaySummary(results.summary);
        this.displayTerms(results.terms);
        this.displayInsights(results.insights);
        this.displayActions(results.actions);
        console.log('Results displayed successfully');
    }

    displaySummary(summary) {
        const container = document.getElementById('summary-content');
        if (container) {
            container.innerHTML = `<p style="line-height: 1.6; font-size: 16px;">${summary}</p>`;
        }
    }

    displayTerms(terms) {
        const container = document.getElementById('terms-list');
        if (!container) return;
        
        if (terms.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--legal-gray-light); font-style: italic;">No specific legal terms were identified in this document.</p>';
            return;
        }

        container.innerHTML = terms.map(termObj => `
            <div class="term-item">
                <div class="term-name">${termObj.term.charAt(0).toUpperCase() + termObj.term.slice(1)}</div>
                <p class="term-definition">${termObj.definition}</p>
            </div>
        `).join('');
    }

    displayInsights(insights) {
        const container = document.getElementById('insights-content');
        if (!container) return;

        container.innerHTML = insights.map(insight => `
            <div class="insight-item">
                <h4>
                    ${insight.title}
                    <span class="status status--${insight.status}">${insight.status}</span>
                </h4>
                <p>${insight.content}</p>
            </div>
        `).join('');
    }

    displayActions(actions) {
        const container = document.getElementById('actions-content');
        if (!container) return;

        container.innerHTML = actions.map(action => `
            <div class="action-item">
                <h4>
                    ${action.title}
                    <span class="status status--${action.priority}">${action.priority} Priority</span>
                </h4>
                <p>${action.content}</p>
            </div>
        `).join('');
    }

    switchTab(tabName) {
        console.log('Switching to tab:', tabName);
        
        // Remove active class from all tabs and panels
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanels = document.querySelectorAll('.tab-panel');
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to selected tab and panel
        const selectedTabButton = document.querySelector(`[data-tab="${tabName}"]`);
        const selectedTabPanel = document.getElementById(`${tabName}-panel`);
        
        if (selectedTabButton) {
            selectedTabButton.classList.add('active');
        }
        
        if (selectedTabPanel) {
            selectedTabPanel.classList.add('active');
        }
    }

    printResults() {
        window.print();
    }

    async copyResults() {
        try {
            // Collect content from all tabs
            const summaryContent = document.getElementById('summary-content');
            const termsContent = document.getElementById('terms-list');
            
            let fullText = 'LEGAL DOCUMENT ANALYSIS\n';
            fullText += '=' + '='.repeat(50) + '\n\n';
            
            if (summaryContent) {
                fullText += 'PLAIN ENGLISH SUMMARY:\n';
                fullText += summaryContent.textContent.trim() + '\n\n';
            }
            
            if (termsContent) {
                fullText += 'KEY LEGAL TERMS:\n';
                const terms = termsContent.querySelectorAll('.term-item');
                terms.forEach(term => {
                    const termName = term.querySelector('.term-name')?.textContent || '';
                    const termDef = term.querySelector('.term-definition')?.textContent || '';
                    if (termName && termDef) {
                        fullText += `• ${termName}: ${termDef}\n`;
                    }
                });
                fullText += '\n';
            }
            
            fullText += 'Generated by Legal Document AI - ' + new Date().toLocaleDateString();

            // Try modern clipboard API first
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(fullText);
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = fullText;
                textArea.style.position = 'fixed';
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            
            this.showToast('Results copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy results:', err);
            this.showToast('Failed to copy results. Please try again.');
        }
    }

    clearResults() {
        const legalText = document.getElementById('legal-text');
        if (legalText) {
            legalText.value = '';
        }
        
        this.updateCharacterCount();
        this.toggleAnalyzeButton();
        this.hideResults();
        this.hideProcessing();

        // Reset to summary tab
        this.switchTab('summary');
        
        this.showToast('Results cleared successfully!');
        console.log('Results cleared');
    }

    showToast(message) {
        // Remove existing toast if any
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--legal-success);
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Trigger slide-in animation
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
        });
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new LegalDocumentAI();
    });
} else {
    app = new LegalDocumentAI();
}