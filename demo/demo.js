
import clippy from '../dist/index.js'

const ClippyDemo = (function() {
    const availableAgents = ['Otto']
    const animationList = ['Standing', 'Looking', 'Boombox', 'Thinking', 'Spa', 'Timing']
    let agentEventCount = 0

    const talks = [
        'Otterly amazing! You just added your first student—here\'s to many more!',
        'You\'re making waves! Your first student referral data is in. Keep up the great work!',
        'Three days in a row? You\'re dedicated! Keep the streak going!',
        'Took a weekend off? Even otters need to float and relax! Welcome back!',
        'High-five! You\'ve downloaded 5 reports!'
    ]

    function init() {
        this.$el = document.querySelector('.my-clippy')
    }

    function nextAgent() {
        let agentName = availableAgents[0]
        if (!agentName) return;

        clippy.load({
            name: agentName,
            selector: "my-clippy",
            successCb: agent => {
                window[agentName] = agent
                agent.show();

                // Speak on click and start
                const speak = () => {
                    agent.play(animationList[agentEventCount % animationList.length])
                    agent.speak(talks[agentEventCount % talks.length])
                    agentEventCount++
                }
                agent._el.addEventListener('click', () => speak());
                speak()

                // Animate randomly
                // setInterval(() => {
                //     agent.animate()
                // }, 3000 + (Math.random() * 4000))
            }
        });  //, undefined, '../assets/agents/');
    }
    function destroy() {
        this.$el.innerHTML = ''
    }

    return {
        init,
        nextAgent,
        destroy,

    }
})();


window.onload = () => {
    ClippyDemo.init();
    ClippyDemo.nextAgent();
    document.getElementById('next-agent').addEventListener('click', () => {
        console.log('click');
        ClippyDemo.destroy();
        ClippyDemo.nextAgent();
    });
}
