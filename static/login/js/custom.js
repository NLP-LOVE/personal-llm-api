(function() {
	"use strict";

    // Sidebar Menu
    const sidebarAreaID = document.getElementById("sidebar-area");
    if (sidebarAreaID) {
        function initializeAccordions() {
            const accordions = document.querySelectorAll('.accordion-button.toggle, .sidemenu-link.toggle');
            accordions.forEach((accordion) => {
                accordion.addEventListener('click', function () {
                    // Close all panels in the current accordion level
                    let siblingAccordions = Array.from(this.closest('.accordion-collapse')?.querySelectorAll('.accordion-button.toggle, .sidemenu-link.toggle') || accordions);
                    siblingAccordions.forEach((acc) => {
                        if (acc !== accordion) {
                            acc.classList.remove('open');
                            acc.setAttribute('aria-expanded', 'false');
                            acc.nextElementSibling.style.display = 'none';
                        }
                    });
                    // Toggle current panel
                    this.classList.toggle('open');
                    const panel = this.nextElementSibling;
                    if (panel.style.display === 'block') {
                        panel.style.display = 'none';
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        panel.style.display = 'block';
                        this.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        }
        document.addEventListener('DOMContentLoaded', () => {
            initializeAccordions();
        });
    }

    // Hide Sidebar Toggle
    const hideSidebarToggleID = document.getElementById("hide-sidebar-toggle");
    if (hideSidebarToggleID) {
        // Select the button and the target divs
        const toggleButton1 = document.getElementById('hide-sidebar-toggle');
        const toggleButton2 = document.getElementById('hide-sidebar-toggle2');
        const targetDiv1 = document.getElementById('sidebar-area');
        const targetDiv2 = document.getElementById('main-content');
        const targetDiv3 = document.getElementById('header-area');
        
        // Add click event for the first button to toggle 'active' class on the first two divs
        toggleButton1.addEventListener('click', function() {
            // Toggle the 'active' class on the button
            toggleButton1.classList.toggle('active');
            // Toggle the 'active' class on the first two divs
            targetDiv1.classList.toggle('active');
            targetDiv2.classList.toggle('active');
            targetDiv3.classList.toggle('active');
        });
        // Add click event for the second button to toggle 'active' class on the other two divs
        toggleButton2.addEventListener('click', function() {
            // Toggle the 'active' class on the button
            toggleButton2.classList.toggle('active');
            // Toggle the 'active' class on the second set of divs
            targetDiv1.classList.toggle('active');
            targetDiv2.classList.toggle('active');
            targetDiv3.classList.toggle('active');
        });
    }

    // Dropdown Menu
    const trezoCardDropdownButton = document.getElementById("dropdownToggleBtn");
    if (trezoCardDropdownButton) {
        // Function to remove active class from all buttons
        function removeActiveClass() {
            document.querySelectorAll("#dropdownToggleBtn").forEach(function(btn) {
                btn.classList.remove("active");
            });
        }
    
        // Add event listener to buttons
        document.querySelectorAll("#dropdownToggleBtn").forEach(function(button) {
            button.addEventListener("click", function(event) {
                // Check if the clicked button is active
                const isActive = this.classList.contains("active");
    
                // Remove active class from all buttons
                removeActiveClass();
    
                // If the clicked button was not active, add the active class
                if (!isActive) {
                    this.classList.add("active");
                }
    
                // Stop the click event from propagating to the document
                event.stopPropagation();
            });
        });
    
        // Add event listener to the document to remove active class on click outside
        document.addEventListener("click", function() {
            removeActiveClass();
        });
    }

    // Dark/Light Toggle
	const getSwitchToggleID = document.getElementById('light-dark-toggle');
	if (getSwitchToggleID) {
		const switchToggle = document.getElementById('light-dark-toggle');
        const html = document.documentElement;  // Targeting the <html> element
        if (switchToggle) {
            const savedTheme = localStorage.getItem("trezo_theme");
            // Apply the saved theme class if it exists
            if (savedTheme) {
                html.classList.add(savedTheme === "dark" ? "dark" : "light");
            }
            // Add event listener to switch between themes
            switchToggle.addEventListener("click", () => {
                if (html.classList.contains("dark")) {
                    // Switch to light theme
                    html.classList.remove("dark");
                    html.classList.add("light");
                    localStorage.setItem("trezo_theme", "light");
                } else {
                    // Switch to dark theme
                    html.classList.remove("light");
                    html.classList.add("dark");
                    localStorage.setItem("trezo_theme", "dark");
                }
            });
        }
	}

    // RTL Mode Toggle
	const getRTLModeID = document.getElementById('rtl-mode-toggle');
	if (getRTLModeID) {
		// Function to toggle direction and active class
        function toggleDirection() {
            const htmlTag = document.documentElement; // Access the <html> tag
            const toggleButton = document.getElementById('rtl-mode-toggle'); // Access the button
            const currentDirection = htmlTag.getAttribute('dir');
            const newDirection = currentDirection === 'ltr' ? 'rtl' : 'ltr';
            // Set new direction on the <html> tag
            htmlTag.setAttribute('dir', newDirection);
            // Toggle the 'active' class on the button based on the new direction
            if (newDirection === 'rtl') {
                toggleButton.classList.add('open');
            } else {
                toggleButton.classList.remove('open');
            }
            // Save new direction in localStorage
            localStorage.setItem('textDirection', newDirection);
        }
        // On page load, check if there is a saved direction in localStorage
        window.onload = function() {
            const savedDirection = localStorage.getItem('textDirection') || 'ltr'; // Default to 'ltr' if not found
            const toggleButton = document.getElementById('rtl-mode-toggle'); // Access the button
            // Set the direction for <html> tag based on localStorage
            document.documentElement.setAttribute('dir', savedDirection);
            // Apply the 'active' class if the saved direction is 'rtl'
            if (savedDirection === 'rtl') {
                toggleButton.classList.add('open');
            }
            // Add click event listener to the button
            toggleButton.onclick = toggleDirection;
        };
	}

    // Fullscreen Btn
    const fullscreenBtn = document.getElementById("fullscreenBtn");
    if (fullscreenBtn) {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        const fullscreenIcon = document.getElementById('fullscreenIcon');
    
        // Function to toggle fullscreen
        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
                fullscreenIcon.textContent = "fullscreen_exit"; // Change to "exit fullscreen" icon
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    fullscreenIcon.textContent = "fullscreen"; // Change back to "enter fullscreen" icon
                }
            }
        }
    
        // Add event listener to the button
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // eCommerce Total Sales Chart
    const ecommerceTotalSalesChart = document.getElementById("ecommerceTotalSalesChart");
    if (ecommerceTotalSalesChart) {
        var options = {
            series: [
                {
                    name: "Current Sale",
                    data: [35, 50, 55, 60, 50, 60, 55, 60, 78, 40, 95, 80]
                },
                {
                    name: "Last Year Sale",
                    data: [70, 50, 40, 40, 62, 52, 80, 40, 60, 53, 70, 70]
                }
            ],
            chart: {
                type: "area",
                height: 365,
                zoom: {
                    enabled: false
                }
            },
            colors: [
                "#605DFF", "#DDE4FF"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2, 0],
                dashArray: [0, 6, 0]
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#ecommerceTotalSalesChart"), options);
        chart.render();
    }

    // eCommerce Total Orders Chart
    const ecommerceTotalOrdersChart = document.getElementById("ecommerceTotalOrdersChart");
    if (ecommerceTotalOrdersChart) {
        var options = {
            series: [
                {
                    name: "Completed",
                    data: [80, 55, 60, 55, 80]
                },
                {
                    name: "Pending",
                    data: [50, 85, 60, 70, 60]
                }
            ],
            chart: {
                type: "bar",
                height: 99,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#1F64F1", "#C2CDFF"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "85%"
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                show: true,
                colors: ["transparent"]
            },
            grid: {
                show: true,
                borderColor: "#ffffff"
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#ecommerceTotalOrdersChart"), options);
        chart.render();
    }

    // eCommerce Total Customers Chart
    const ecommerceTotalCustomersChart = document.getElementById("ecommerceTotalCustomersChart");
    if (ecommerceTotalCustomersChart) {
        var options = {
            series: [
                {
                    name: "Orders",
                    data: [55, 50, 60, 45, 85, 80, 100]
                },
                {
                    name: "Sales",
                    data: [45, 38, 80, 65, 55, 75, 90]
                }
            ],
            chart: {
                height: 142,
                type: "line",
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#605DFF", "#C2CDFF"
            ],
            stroke: {
                width: 2,
                curve: "straight"
            },
            grid: {
                show: true,
                borderColor: "#ffffff"
            },
            xaxis: {
                categories: [
                    "01 Jun",
                    "02 Jun",
                    "03 Jun",
                    "04 Jun",
                    "05 Jun",
                    "06 Jun",
                    "07 Jun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#ecommerceTotalCustomersChart"), options);
        chart.render();
    }

    // eCommerce Total Revenue Chart
    const ecommerceTotalRevenueChart = document.getElementById("ecommerceTotalRevenueChart");
    if (ecommerceTotalRevenueChart) {
        var options = {
            series: [
                {
                    name: "Fashion",
                    data: [20, 40, 25, 60, 30, 50]
                },
                    {
                    name: "Others",
                    data: [20, 20, 25, 15, 35, 25]
                }
            ],
            chart: {
                type: "bar",
                height: 102,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "55%"
                }
            },
            colors: [
                "#605DFF", "#C2CDFF"
            ],
            grid: {
                show: true,
                borderColor: "#ffffff"
            },
            stroke: {
                width: 2,
                show: true,
                colors: ["transparent"]
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            fill: {
                opacity: 1
            }
        };
        var chart = new ApexCharts(document.querySelector("#ecommerceTotalRevenueChart"), options);
        chart.render();
    }

    // eCommerce Order Summary Chart
    const ecommerceOrderSummaryChart = document.getElementById("ecommerceOrderSummaryChart");
    if (ecommerceOrderSummaryChart) {
        var options = {
            series: [60, 30, 10],
            chart: {
                height: 287,
                type: "donut"
            },
            labels: [
                "Completed", "New Order", "Pending"
            ],
            colors: [
                "#37D80A", "#605DFF", "#AD63F6"
            ],
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            dataLabels: {
                enabled: false
            }
        };
        var chart = new ApexCharts(document.querySelector("#ecommerceOrderSummaryChart"), options);
        chart.render();
    }

    // eCommerce Returning Customer Rate Chart
    const ecommerceReturningCustomerRateChart = document.getElementById("ecommerceReturningCustomerRateChart");
    if (ecommerceReturningCustomerRateChart) {
        var options = {
            series: [
                {
                    name: "Fifth Time",
                    data: [70, 23, 40, 30, 62, 52, 90, 20, 60, 53]
                },
                {
                    name: "Fourth Time",
                    data: [15, 58, 45, 38, 70, 50, 55, 60, 78, 40]
                }
            ],
            chart: {
                height: 319,
                type: "line",
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#605DFF", "#AD63F6"
            ],
            stroke: {
                curve: "smooth",
                width: 2,
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            markers: {
                size: 4,
                strokeWidth: 0,
                shape: ["circle", "square"],
                hover: {
                    size: 5
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return val + '%'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#ecommerceReturningCustomerRateChart"), options);
        chart.render();
    }

    // CRM Revenue Growth Chart
    const crmRevenueGrowthChart = document.getElementById("crmRevenueGrowthChart");
    if (crmRevenueGrowthChart) {
        var options = {
            series: [
                {
                    name: "Revenue Growth",
                    data: [3, 7, 7, 10, 9, 11, 15]
                }
            ],
            chart: {
                type: "area",
                height: 95,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3584FC"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "straight",
                width: 1
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#crmRevenueGrowthChart"), options);
        chart.render();
    }

    // CRM Lead Conversion Chart
    const crmLeadConversionChart = document.getElementById("crmLeadConversionChart");
    if (crmLeadConversionChart) {
        var options = {
            series: [
                {
                    name: "Lead Conversion",
                    data: [3, 6, 7, 6, 9, 10, 7]
                }
            ],
            chart: {
                type: "area",
                height: 95,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "smooth",
                width: 1
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return val + '%'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#crmLeadConversionChart"), options);
        chart.render();
    }

    // CRM Total Orders Chart
    const crmTotalOrdersChart = document.getElementById("crmTotalOrdersChart");
    if (crmTotalOrdersChart) {
        var options = {
            series: [
                {
                    name: "Total Orders",
                    data: [44, 55, 57, 56, 61, 58, 63]
                }
            ],
            chart: {
                type: "bar",
                height: 110,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: "50%",
                    borderRadius: 2
                }
            },
            colors: [
                "#0dcaf0"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                width: 2,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val;
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#crmTotalOrdersChart"), options);
        chart.render();
    }

    // CRM Annual Profit Chart
    const crmAnnualProfitChart = document.getElementById("crmAnnualProfitChart");
    if (crmAnnualProfitChart) {
        var options = {
            series: [
                {
                    name: "Revenue Growth",
                    data: [3, 12, 8, 10, 15, 10, 7]
                }
            ],
            chart: {
                type: "area",
                height: 95,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#C52B09"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "monotoneCubic",
                width: 1
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#crmAnnualProfitChart"), options);
        chart.render();
    }

    // CRM Leads By Source Chart
    const crmLeadsBySourceChart = document.getElementById("crmLeadsBySourceChart");
    if (crmLeadsBySourceChart) {
        var options = {
            series: [320, 60, 30, 160, 279, 19],
            chart: {
                height: 268,
                type: "donut"
            },
            labels: [
                "Organic", "Paid", "Direct", "Social", "Referrals", "Others"
            ],
            colors: [
                "#605DFF", "#3584FC", "#AD63F6", "#0dcaf0", "#25B003", "#FD5812"
            ],
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '28px',
                                fontWeight: '600'
                            },
                            total: {
                                show: true,
                                color: '#64748B'
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false
            }
        };
        var chart = new ApexCharts(document.querySelector("#crmLeadsBySourceChart"), options);
        chart.render();
    }

    // CRM Balance Overview Chart
    const crmBalanceOverviewChart = document.getElementById("crmBalanceOverviewChart");
    if (crmBalanceOverviewChart) {
        var options = {
            series: [
                {
                    name: "Revenue",
                    data: [5, 12, 20, 23, 25, 30, 40, 45, 50, 70, 65, 100]
                },
                {
                    name: "Expenses",
                    data: [15, 20, 30, 30, 35, 45, 60, 70, 80, 85, 95, 140]
                }
            ],
            chart: {
                type: "area",
                height: 350,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: true
                }
            },
            colors: [
                "#AD63F6", "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.5
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 6,
                max: 150,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#crmBalanceOverviewChart"), options);
        chart.render();
    }

    // CRM Sales Report Chart
    const crmSalesReportChart = document.getElementById("crmSalesReportChart");
    if (crmSalesReportChart) {
        var options = {
            series: [
                {
                    name: "Online",
                    data: [45, 23, 62, 60, 110, 100, 135]
                },
                {
                    name: "Offline",
                    data: [20, 58, 24, 50, 40, 70, 97]
                }
            ],
            chart: {
                height: 360,
                type: "line",
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#605DFF", "#FE7A36"
            ],
            stroke: {
                curve: "straight",
                width: 2
            },
            grid: {
                show: true,
                borderColor: "#F6F7F9"
            },
            markers: {
                size: 4,
                strokeWidth: 0,
                shape: ["circle", "square"],
                hover: {
                    size: 5
                }
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#B1BBC8'
                },
                axisBorder: {
                    show: false,
                    color: '#B1BBC8'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 6,
                max: 150,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#crmSalesReportChart"), options);
        chart.render();
    }

    // Project Management Projects Roadmap Chart
    const pmProjectsRoadmapChart = document.getElementById("pmProjectsRoadmapChart");
    if (pmProjectsRoadmapChart) {
        var options = {
            series: [
                {
                    name: "Projects",
                    data: [400, 550, 600, 700, 1000, 1100, 1200]
                }
            ],
            chart: {
                type: "bar",
                height: 342,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3584FC"
            ],
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    "Project Planning",
                    "Research",
                    "Design",
                    "Front-end",
                    "Development",
                    "Review & QA",
                    "Launch"
                ],
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#pmProjectsRoadmapChart"), options);
        chart.render();
    }

    // Project Management Projects Progress Chart
    const pmProjectsProgressChart = document.getElementById("pmProjectsProgressChart");
    if (pmProjectsProgressChart) {
        var options = {
            series: [
                {
                    name: "Completed",
                    data: [70, 23, 45, 30, 62, 70]
                },
                {
                    name: "In Progress",
                    data: [15, 40, 37, 38, 80, 45]
                },
                {
                    name: "Not Start Yet",
                    data: [50, 11, 60, 15, 31, 30]
                },
                {
                    name: "Cancelled",
                    data: [30, 60, 25, 22, 50, 15]
                }
            ],
            chart: {
                height: 318,
                type: "line",
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: true
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#605DFF", "#FE7A36", "#AD63F6", "#D71C00"
            ],
            stroke: {
                curve: "smooth",
                width: 2
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            markers: {
                size: 4,
                strokeWidth: 0,
                shape: ["circle", "square", "circle", "square"],
                hover: {
                    size: 5
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return val + '%'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#pmProjectsProgressChart"), options);
        chart.render();
    }

    // Project Management Projects Analysis Chart
    const pmProjectsAnalysisChart = document.getElementById("pmProjectsAnalysisChart");
    if (pmProjectsAnalysisChart) {
        var options = {
            series: [
                {
                    name: "Budgets",
                    data: [40, 60, 55, 30, 60, 130, 63]
                },
                {
                    name: "Expenses",
                    data: [15, 65, 100, 40, 90, 90, 91]
                },
                {
                    name: "Revenue",
                    data: [55, 70, 30, 50, 110, 60, 52]
                }
            ],
            chart: {
                type: "bar",
                height: 418,
                toolbar: {
                    show: true
                }
            },
            colors: [
                "#605DFF", "#AD63F6", "#3584FC"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "60%"
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 4,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 6,
                max: 150,
                min: 0,
                labels: {
                    // formatter: (val) => {
                    //     return '$' + val + 'k'
                    // },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#pmProjectsAnalysisChart"), options);
        chart.render();
    }

    // Project Management Tasks Overview Chart
    const pmTasksOverviewChart = document.getElementById("pmTasksOverviewChart");
    if (pmTasksOverviewChart) {
        var options = {
            series: [
                55, 44, 30, 12, 22
            ],
            chart: {
                height: 376,
                type: "pie"
            },
            labels: [
                "Completed", "In Progress", "Pending", "Active", "Cancelled"
            ],
            colors: [
                "#37D80A", "#605DFF", "#AD63F6", "#3584FC", "#FD5812"
            ],
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    expandOnClick: false
                }
            },
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 7
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#pmTasksOverviewChart"), options);
        chart.render();
    }

    // Add New Popup Toggle
    const addNewPopupID = document.getElementById("add-new-popup");
    if (addNewPopupID) {
        var buttons = document.querySelectorAll("#add-new-popup-toggle");
        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                // Toggle class on the div
                var divElement = document.getElementById("add-new-popup");
                divElement.classList.toggle("active");
            });
        });
    }

    // Scrolling Long Content Modal
    const scrollingLongContentModal = document.getElementById("scrollingLongContentModal");
    if (scrollingLongContentModal) {
        var buttons = document.querySelectorAll("#scrollingLongContentModalToggle");
        buttons.forEach(function(button) {
            button.addEventListener("click", function() {
                // Toggle class on the div
                var divElement = document.getElementById("scrollingLongContentModal");
                divElement.classList.toggle("active");
            });
        });
    }

    // LMS Student’s Interested Topics Chart
    const lmsStudentsInterestedTopicsChart = document.getElementById("lmsStudentsInterestedTopicsChart");
    if (lmsStudentsInterestedTopicsChart) {
        var options = {
            series: [
                {
                    name: "Courses",
                    data: [47, 69, 37, 17, 28, 40]
                }
            ],
            chart: {
                type: "bar",
                height: 424,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF"
            ],
            plotOptions: {
                bar: {
                    barHeight: '21px',
                    horizontal: true
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    "UX/UI Design",
                    "WordPress",
                    "Motion Design",
                    "Video Editing",
                    "Angular",
                    "Python"
                ],
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#lmsStudentsInterestedTopicsChart"), options);
        chart.render();
    }

    // LMS Time Spent Chart
    const lmsTimeSpentChart = document.getElementById("lmsTimeSpentChart");
    if (lmsTimeSpentChart) {
        var options = {
            series: [
                {
                    name: "Time Spent",
                    data: [30, 70, 80, 95, 90, 20, 40]
                }
            ],
            chart: {
                type: "bar",
                height: 250,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#AD63F6"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "30%"
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 4,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 100,
                min: 0,
                labels: {
                    // formatter: (val) => {
                    //     return val + 'hrs'
                    // },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + " hours";
                    }
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#lmsTimeSpentChart"), options);
        chart.render();
    }

    // LMS Courses Sales Chart
    const lmsCoursesSalesChart = document.getElementById("lmsCoursesSalesChart");
    if (lmsCoursesSalesChart) {
        var options = {
            series: [
                {
                    name: "Sales",
                    data: [100, 130, 115, 170, 110, 120, 85, 140, 150, 100, 110, 90, 160, 125, 105, 130, 145, 120, 150, 155, 220, 165]
                }
            ],
            chart: {
                type: "area",
                height: 270,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                    "11 Jan",
                    "12 Jan",
                    "13 Jan",
                    "14 Jan",
                    "15 Jan",
                    "16 Jan",
                    "17 Jan",
                    "18 Jan",
                    "19 Jan",
                    "20 Jan",
                    "21 Jan",
                    "22 Jan",
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 250,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: (val) => {
                        return '$' + val + 'K'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#lmsCoursesSalesChart"), options);
        chart.render();
    }

    // HelpDesk New Tickets vs Solved Tickets Chart
    const helpDeskNewTicketsSolvedTicketsChart = document.getElementById("helpDeskNewTicketsSolvedTicketsChart");
    if (helpDeskNewTicketsSolvedTicketsChart) {
        var options = {
            series: [
                {
                    name: "New Tickets",
                    data: [25, 70, 25, 45, 60, 55, 70]
                },
                {
                    name: "Solved Tickets",
                    data: [65, 45, 65, 30, 75, 24, 50]
                }
            ],
            chart: {
                type: "area",
                height: 474,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF", "#FD5812"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: 2
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.6
                }
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 80,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#helpDeskNewTicketsSolvedTicketsChart"), options);
        chart.render();
    }

    // HelpDesk Tickets Resolved Chart
    const helpDeskTicketsResolvedChart = document.getElementById("helpDeskTicketsResolvedChart");
    if (helpDeskTicketsResolvedChart) {
        var options = {
            series: [
                {
                    name: "Tickets Resolved",
                    data: [35, 70, 35, 65, 45, 98, 80]
                }
            ],
            chart: {
                type: "area",
                height: 130,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 100,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#helpDeskTicketsResolvedChart"), options);
        chart.render();
    }

    // HelpDesk Tickets In Progress Chart
    const helpDeskTicketsInProgressChart = document.getElementById("helpDeskTicketsInProgressChart");
    if (helpDeskTicketsInProgressChart) {
        var options = {
            series: [
                {
                    name: "Tickets In Progress",
                    data: [30, 65, 50, 85, 65, 75, 60]
                }
            ],
            chart: {
                type: "area",
                height: 130,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#FD5812"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 100,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#helpDeskTicketsInProgressChart"), options);
        chart.render();
    }

    // HelpDesk Tickets Due Chart
    const helpDeskTicketsDueChart = document.getElementById("helpDeskTicketsDueChart");
    if (helpDeskTicketsDueChart) {
        var options = {
            series: [
                {
                    name: "Tickets Due",
                    data: [35, 70, 40, 65, 45, 70, 65]
                }
            ],
            chart: {
                type: "area",
                height: 130,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#AD63F6"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 100,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#helpDeskTicketsDueChart"), options);
        chart.render();
    }

    // HelpDesk Tickets New Open Chart
    const helpDeskTicketsNewOpenChart = document.getElementById("helpDeskTicketsNewOpenChart");
    if (helpDeskTicketsNewOpenChart) {
        var options = {
            series: [
                {
                    name: "Tickets New Open",
                    data: [40, 55, 35, 85, 50, 85, 95]
                }
            ],
            chart: {
                type: "area",
                height: 130,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#37D80A"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 100,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#helpDeskTicketsNewOpenChart"), options);
        chart.render();
    }

    // HelpDesk Tickets Status
    const helpDeskTicketsStatusChart = document.getElementById("helpDeskTicketsStatusChart");
    if (helpDeskTicketsStatusChart) {
        var options = {
            series: [
                {
                    name: "Solved",
                    data: [28, 50, 90, 95, 20, 70, 35]
                },
                {
                    name: "In Progress",
                    data: [80, 60, 70, 30, 45, 20, 80]
                },
                {
                    name: "Pending",
                    data: [32, 23, 78, 35, 65, 35, 15]
                },
                {
                    name: "Others",
                    data: [60, 25, 80, 25, 15, 40, 15]
                }
            ],
            chart: {
                type: "bar",
                height: 392,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF", "#3584FC", "#AD63F6", "#FD5812"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "65%"
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 3,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + " Tickets";
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#helpDeskTicketsStatusChart"), options);
        chart.render();
    }

    // HelpDesk Customer Satisfaction Chart
    const helpDeskCustomerSatisfactionChart = document.getElementById("helpDeskCustomerSatisfactionChart");
    if (helpDeskCustomerSatisfactionChart) {
        var options = {
            series: [50, 15, 75, 50],
            chart: {
                height: 152,
                type: "donut"
            },
            labels: [
                "Highly Satisfied", "Satisfied", "Low Satisfied", "Unsatisfied"
            ],
            colors: [
                "#AD63F6", "#C2CDFF", "#FFAA72", "#0dcaf0"
            ],
            stroke: {
                width: 1,
                show: true,
                colors: ["transparent"]
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        size: '73%',
                        labels: {
                            show: false,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '28px',
                                fontWeight: '600'
                            },
                            total: {
                                show: true,
                                color: '#64748B'
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#helpDeskCustomerSatisfactionChart"), options);
        chart.render();
    }

    // HelpDesk Response Time Chart
    const helpDeskResponseTimeChart = document.getElementById("helpDeskResponseTimeChart");
    if (helpDeskResponseTimeChart) {
        var options = {
            series: [
                {
                    name: "Response Time",
                    data: [100, 130, 115, 170, 110, 120, 85, 140, 150, 100, 110, 90, 160, 125, 105, 130, 145, 120, 150, 155, 220, 165]
                }
            ],
            chart: {
                type: "area",
                height: 220,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#FFB264"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                    "11 Jan",
                    "12 Jan",
                    "13 Jan",
                    "14 Jan",
                    "15 Jan",
                    "16 Jan",
                    "17 Jan",
                    "18 Jan",
                    "19 Jan",
                    "20 Jan",
                    "21 Jan",
                    "22 Jan",
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 250,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: (val) => {
                        return val + ' mins'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#helpDeskResponseTimeChart"), options);
        chart.render();
    }

    // HelpDesk Support Overview Chart
    const hdSupportOverviewChart = document.getElementById("hdSupportOverviewChart");
    if (hdSupportOverviewChart) {
        var options = {
            series: [
                55, 44, 30, 12
            ],
            chart: {
                height: 376,
                type: "pie"
            },
            labels: [
                "Solved", "In Progress", "Pending", "Unassigned"
            ],
            colors: [
                "#37D80A", "#605DFF", "#AD63F6", "#3584FC", "#FD5812"
            ],
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    expandOnClick: false
                }
            },
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 7
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hdSupportOverviewChart"), options);
        chart.render();
    }

    // Upcoming Events Slides
    const upcomingEventsSlides = document.getElementById("upcomingEventsSlides");
    if (upcomingEventsSlides) {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            }
        });
    }

    // Our Top Courses Slides
    const ourTopCoursesSlides = document.getElementById("ourTopCoursesSlides");
    if (ourTopCoursesSlides) {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            }
        });
    }

    // Working Schedule Calendar
    const workingScheduleCalendar = document.getElementById("workingScheduleCalendar");
    if (workingScheduleCalendar) {
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        function renderCalendar(month, year) {
            const calendar = document.querySelector('.calendar');
            const currentDate = new Date().getDate();
            
            // Clear previous calendar dates
            calendar.innerHTML = `
                <div class="days">Sun</div>
                <div class="days">Mon</div>
                <div class="days">Tue</div>
                <div class="days">Wed</div>
                <div class="days">Thu</div>
                <div class="days">Fri</div>
                <div class="days">Sat</div>
            `;

            // Set month and year title
            document.getElementById('monthYear').innerText = `${monthNames[month]} ${year}`;

            const firstDay = new Date(year, month, 1).getDay();
            const lastDate = new Date(year, month + 1, 0).getDate();

            // Create empty slots before the first day of the month
            for (let i = 0; i < firstDay; i++) {
                const emptyDiv = document.createElement('div');
                calendar.appendChild(emptyDiv);
            }

            // Fill the days of the month
            for (let date = 1; date <= lastDate; date++) {
                const dateDiv = document.createElement('div');
                dateDiv.innerText = date;

                // Highlight today's date if it is the current month and year
                if (date === currentDate && month === today.getMonth() && year === today.getFullYear()) {
                    dateDiv.classList.add('today');
                }

                calendar.appendChild(dateDiv);
            }
        }

        // Event listeners for previous and next buttons
        document.getElementById('prevBtn').addEventListener('click', () => {
            month--;
            if (month < 0) {
                month = 11;
                year--;
            }
            renderCalendar(month, year);
        });

        document.getElementById('nextBtn').addEventListener('click', () => {
            month++;
            if (month > 11) {
                month = 0;
                year++;
            }
            renderCalendar(month, year);
        });

        // Initial render of the current month
        renderCalendar(month, year);
    }

    // Analytics Overview Chart
    const analyticsOverviewChart = document.getElementById("analyticsOverviewChart");
    if (analyticsOverviewChart) {
        var options = {
            series: [
                {
                    name: "New users",
                    data: [28, 50, 90, 95, 20, 70, 35]
                },
                {
                    name: "Page Views",
                    data: [80, 60, 70, 30, 45, 20, 80]
                },
                {
                    name: "Page Sessions",
                    data: [32, 23, 78, 35, 65, 35, 15]
                },
                {
                    name: "Bounce Rate",
                    data: [60, 25, 80, 25, 15, 40, 15]
                }
            ],
            chart: {
                type: "bar",
                height: 354,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF", "#AD63F6", "#3584FC", "#FD5812"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "65%",
                    borderRadius: 4
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 3,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsOverviewChart"), options);
        chart.render();
    }

    // Analytics Realtime Active Users Chart
    const analyticsRealtimeActiveUsersChart = document.getElementById("analyticsRealtimeActiveUsersChart");
    if (analyticsRealtimeActiveUsersChart) {
        var options = {
            series: [
                {
                    name: "Users",
                    data: [100, 90, 85, 95, 100, 100, 90, 85, 95, 100, 100, 90, 85, 95, 100, 100, 90, 85, 95, 100, 100, 90, 85, 95, 100, 100, 90, 85, 95, 100]
                }
            ],
            chart: {
                type: "bar",
                height: 170,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#757DFF"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "100%",
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 3,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    show: false,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsRealtimeActiveUsersChart"), options);
        chart.render();
    }

    // Analytics Website Visits Chart
    const analyticsWebsiteVisitsChart = document.getElementById("analyticsWebsiteVisitsChart");
    if (analyticsWebsiteVisitsChart) {
        var options = {
            series: [
                {
                    name: "Users",
                    data: [3, 7, 7, 10, 9, 11, 15]
                }
            ],
            chart: {
                type: "area",
                height: 95,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3584FC"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "straight",
                width: 1
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsWebsiteVisitsChart"), options);
        chart.render();
    }

    // Analytics New Registers Chart
    const analyticsNewRegistersChart = document.getElementById("analyticsNewRegistersChart");
    if (analyticsNewRegistersChart) {
        var options = {
            series: [
                {
                    name: "Users",
                    data: [3, 12, 8, 10, 15, 10, 7]
                }
            ],
            chart: {
                type: "area",
                height: 95,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#C52B09"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "monotoneCubic",
                width: 1
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsNewRegistersChart"), options);
        chart.render();
    }

    // Analytics Device Sessions Chart
    const analyticsDeviceSessionsChart = document.getElementById("analyticsDeviceSessionsChart");
    if (analyticsDeviceSessionsChart) {
        var options = {
            series: [
                55, 44, 30, 12
            ],
            chart: {
                height: 211,
                type: "pie"
            },
            labels: [
                "Desktop", "Mobile", "Tablet", "Others"
            ],
            colors: [
                "#37D80A", "#605DFF", "#BF85FB", "#FE7A36"
            ],
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    expandOnClick: false
                }
            },
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 7
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsDeviceSessionsChart"), options);
        chart.render();
    }

    // Analytics Clicks Chart
    const analyticsClicksChart = document.getElementById("analyticsClicksChart");
    if (analyticsClicksChart) {
        var options = {
            series: [
                {
                    name: "Clicks",
                    data: [100, 130, 115, 170, 110, 120, 85, 140, 150, 100, 110, 90, 160, 125, 105, 130, 145, 120, 150, 155, 220, 165]
                }
            ],
            chart: {
                type: "area",
                height: 150,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                    "11 Jan",
                    "12 Jan",
                    "13 Jan",
                    "14 Jan",
                    "15 Jan",
                    "16 Jan",
                    "17 Jan",
                    "18 Jan",
                    "19 Jan",
                    "20 Jan",
                    "21 Jan",
                    "22 Jan",
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 250,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsClicksChart"), options);
        chart.render();
    }

    // Analytics Impressions Chart
    const analyticsImpressionsChart = document.getElementById("analyticsImpressionsChart");
    if (analyticsImpressionsChart) {
        var options = {
            series: [
                {
                    name: "Impressions",
                    data: [100, 110, 90, 160, 125, 105, 130, 145, 120, 150, 155, 220, 165, 100, 130, 115, 170, 110, 120, 85, 140, 150]
                }
            ],
            chart: {
                type: "area",
                height: 150,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#EE3E08"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                    "11 Jan",
                    "12 Jan",
                    "13 Jan",
                    "14 Jan",
                    "15 Jan",
                    "16 Jan",
                    "17 Jan",
                    "18 Jan",
                    "19 Jan",
                    "20 Jan",
                    "21 Jan",
                    "22 Jan",
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 250,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsImpressionsChart"), options);
        chart.render();
    }

    // Analytics Sessions Chart
    const analyticsSessionsChart = document.getElementById("analyticsSessionsChart");
    if (analyticsSessionsChart) {
        var options = {
            series: [
                {
                    name: "Sessions",
                    data: [110, 120, 85, 130, 145, 120, 150, 155, 100, 130, 115, 170, 220, 165, 140, 150, 100, 110, 90, 160, 125, 105]
                }
            ],
            chart: {
                type: "area",
                height: 150,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#9135E8"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                    "11 Jan",
                    "12 Jan",
                    "13 Jan",
                    "14 Jan",
                    "15 Jan",
                    "16 Jan",
                    "17 Jan",
                    "18 Jan",
                    "19 Jan",
                    "20 Jan",
                    "21 Jan",
                    "22 Jan",
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 250,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsSessionsChart"), options);
        chart.render();
    }

    // Analytics Sessions by Channel Chart
    const analyticsSessionsByChannelChart = document.getElementById("analyticsSessionsByChannelChart");
    if (analyticsSessionsByChannelChart) {
        var options = {
            series: [976, 651, 818, 459, 320, 209],
            chart: {
                height: 257,
                type: "donut"
            },
            labels: [
                "Email", "Organic Search", "Direct Browse", "Paid Search", "Social", "Referral"
            ],
            colors: [
                "#3584FC", "#37D80A", "#BF85FB", "#90C7FF", "#605DFF", "#FE7A36"
            ],
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 7,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'diamond'
                }
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '28px',
                                fontWeight: '600'
                            },
                            total: {
                                show: true,
                                color: '#64748B'
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false
            }
        };
        var chart = new ApexCharts(document.querySelector("#analyticsSessionsByChannelChart"), options);
        chart.render();
    }

    // Cryptocurrency Watchlist Slides
    const cryptocurrencyWatchlistSlides = document.getElementById("cryptocurrencyWatchlistSlides");
    if (cryptocurrencyWatchlistSlides) {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 10,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                },
                1536: {
                    slidesPerView: 4
                }
            }
        });
    }

    // Crypto Watchlist Bitcoin Chart
    const cryptoWatchlistBitcoinChart = document.getElementById("cryptoWatchlistBitcoinChart");
    if (cryptoWatchlistBitcoinChart) {
        var options = {
            series: [
                {
                    name: "Price",
                    data: [90, 130, 95, 140, 110, 120, 85, 170]
                }
            ],
            chart: {
                type: "area",
                height: 120,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 170,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: (val) => {
                        return '$' + val + 'K'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoWatchlistBitcoinChart"), options);
        chart.render();
    }

    // Crypto Watchlist Ethereum Chart
    const cryptoWatchlistEthereumChart = document.getElementById("cryptoWatchlistEthereumChart");
    if (cryptoWatchlistEthereumChart) {
        var options = {
            series: [
                {
                    name: "Price",
                    data: [90, 130, 140, 110, 120, 95, 85, 170]
                }
            ],
            chart: {
                type: "area",
                height: 120,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#AD63F6"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 170,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: (val) => {
                        return '$' + val + 'K'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoWatchlistEthereumChart"), options);
        chart.render();
    }

    // Crypto Watchlist Solana Chart
    const cryptoWatchlistSolanaChart = document.getElementById("cryptoWatchlistSolanaChart");
    if (cryptoWatchlistSolanaChart) {
        var options = {
            series: [
                {
                    name: "Price",
                    data: [90, 85, 170, 130, 95, 140, 110, 120]
                }
            ],
            chart: {
                type: "area",
                height: 120,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#FD5812"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 170,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: (val) => {
                        return '$' + val + 'K'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoWatchlistSolanaChart"), options);
        chart.render();
    }

    // Crypto Watchlist Binance Chart
    const cryptoWatchlistBinanceChart = document.getElementById("cryptoWatchlistBinanceChart");
    if (cryptoWatchlistBinanceChart) {
        var options = {
            series: [
                {
                    name: "Price",
                    data: [110, 120, 85, 170, 90, 130, 95, 140]
                }
            ],
            chart: {
                type: "area",
                height: 120,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#37D80A"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 170,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: (val) => {
                        return '$' + val + 'K'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoWatchlistBinanceChart"), options);
        chart.render();
    }

    // Crypto Watchlist Cardano Chart
    const cryptoWatchlistCardanoChart = document.getElementById("cryptoWatchlistCardanoChart");
    if (cryptoWatchlistCardanoChart) {
        var options = {
            series: [
                {
                    name: "Price",
                    data: [90, 130, 95, 140, 110, 120, 85, 170]
                }
            ],
            chart: {
                type: "area",
                height: 120,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 170,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: (val) => {
                        return '$' + val + 'K'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoWatchlistCardanoChart"), options);
        chart.render();
    }

    // Crypto Market Price Statistics Chart
    const cryptoMarketPriceStatisticsChart = document.getElementById("cryptoMarketPriceStatisticsChart");
    if (cryptoMarketPriceStatisticsChart) {
        var options = {
            series: [
                {
                    name: "Price",
                    data: [
                        {
                            x: new Date(1538778600000),
                            y: [6629.81, 6650.5, 6623.04, 6633.33]
                        },
                        {
                            x: new Date(1538780400000),
                            y: [6632.01, 6643.59, 6620, 6630.11]
                        },
                        {
                            x: new Date(1538782200000),
                            y: [6630.71, 6648.95, 6623.34, 6635.65]
                        },
                        {
                            x: new Date(1538784000000),
                            y: [6635.65, 6651, 6629.67, 6638.24]
                        },
                        {
                            x: new Date(1538785800000),
                            y: [6638.24, 6640, 6620, 6624.47]
                        },
                        {
                            x: new Date(1538787600000),
                            y: [6624.53, 6636.03, 6621.68, 6624.31]
                        },
                        {
                            x: new Date(1538789400000),
                            y: [6624.61, 6632.2, 6617, 6626.02]
                        },
                        {
                            x: new Date(1538791200000),
                            y: [6627, 6627.62, 6584.22, 6603.02]
                        },
                        {
                            x: new Date(1538793000000),
                            y: [6605, 6608.03, 6598.95, 6604.01]
                        },
                        {
                            x: new Date(1538794800000),
                            y: [6604.5, 6614.4, 6602.26, 6608.02]
                        },
                        {
                            x: new Date(1538796600000),
                            y: [6608.02, 6610.68, 6601.99, 6608.91]
                        },
                        {
                            x: new Date(1538798400000),
                            y: [6608.91, 6618.99, 6608.01, 6612]
                        },
                        {
                            x: new Date(1538800200000),
                            y: [6612, 6615.13, 6605.09, 6612]
                        },
                        {
                            x: new Date(1538802000000),
                            y: [6612, 6624.12, 6608.43, 6622.95]
                        },
                        {
                            x: new Date(1538803800000),
                            y: [6623.91, 6623.91, 6615, 6615.67]
                        },
                        {
                            x: new Date(1538805600000),
                            y: [6618.69, 6618.74, 6610, 6610.4]
                        },
                        {
                            x: new Date(1538807400000),
                            y: [6611, 6622.78, 6610.4, 6614.9]
                        },
                        {
                            x: new Date(1538809200000),
                            y: [6614.9, 6626.2, 6613.33, 6623.45]
                        },
                        {
                            x: new Date(1538811000000),
                            y: [6623.48, 6627, 6618.38, 6620.35]
                        },
                        {
                            x: new Date(1538812800000),
                            y: [6619.43, 6620.35, 6610.05, 6615.53]
                        },
                        {
                            x: new Date(1538814600000),
                            y: [6615.53, 6617.93, 6610, 6615.19]
                        },
                        {
                            x: new Date(1538816400000),
                            y: [6615.19, 6621.6, 6608.2, 6620]
                        },
                        {
                            x: new Date(1538818200000),
                            y: [6619.54, 6625.17, 6614.15, 6620]
                        },
                        {
                            x: new Date(1538820000000),
                            y: [6620.33, 6634.15, 6617.24, 6624.61]
                        },
                        {
                            x: new Date(1538821800000),
                            y: [6625.95, 6626, 6611.66, 6617.58]
                        },
                        {
                            x: new Date(1538823600000),
                            y: [6619, 6625.97, 6595.27, 6598.86]
                        },
                        {
                            x: new Date(1538825400000),
                            y: [6598.86, 6598.88, 6570, 6587.16]
                        },
                        {
                            x: new Date(1538827200000),
                            y: [6588.86, 6600, 6580, 6593.4]
                        },
                        {
                            x: new Date(1538829000000),
                            y: [6593.99, 6598.89, 6585, 6587.81]
                        },
                        {
                            x: new Date(1538830800000),
                            y: [6587.81, 6592.73, 6567.14, 6578]
                        },
                        {
                            x: new Date(1538832600000),
                            y: [6578.35, 6581.72, 6567.39, 6579]
                        },
                        {
                            x: new Date(1538834400000),
                            y: [6579.38, 6580.92, 6566.77, 6575.96]
                        },
                        {
                            x: new Date(1538836200000),
                            y: [6575.96, 6589, 6571.77, 6588.92]
                        },
                        {
                            x: new Date(1538838000000),
                            y: [6588.92, 6594, 6577.55, 6589.22]
                        },
                        {
                            x: new Date(1538839800000),
                            y: [6589.3, 6598.89, 6589.1, 6596.08]
                        },
                        {
                            x: new Date(1538841600000),
                            y: [6597.5, 6600, 6588.39, 6596.25]
                        },
                        {
                            x: new Date(1538843400000),
                            y: [6598.03, 6600, 6588.73, 6595.97]
                        },
                        {
                            x: new Date(1538845200000),
                            y: [6595.97, 6602.01, 6588.17, 6602]
                        },
                        {
                            x: new Date(1538847000000),
                            y: [6602, 6607, 6596.51, 6599.95]
                        },
                        {
                            x: new Date(1538848800000),
                            y: [6600.63, 6601.21, 6590.39, 6591.02]
                        },
                        {
                            x: new Date(1538850600000),
                            y: [6591.02, 6603.08, 6591, 6591]
                        },
                        {
                            x: new Date(1538852400000),
                            y: [6591, 6601.32, 6585, 6592]
                        },
                        {
                            x: new Date(1538854200000),
                            y: [6593.13, 6596.01, 6590, 6593.34]
                        },
                        {
                            x: new Date(1538856000000),
                            y: [6593.34, 6604.76, 6582.63, 6593.86]
                        },
                        {
                            x: new Date(1538857800000),
                            y: [6593.86, 6604.28, 6586.57, 6600.01]
                        },
                        {
                            x: new Date(1538859600000),
                            y: [6601.81, 6603.21, 6592.78, 6596.25]
                        },
                        {
                            x: new Date(1538861400000),
                            y: [6596.25, 6604.2, 6590, 6602.99]
                        },
                        {
                            x: new Date(1538863200000),
                            y: [6602.99, 6606, 6584.99, 6587.81]
                        },
                        {
                            x: new Date(1538865000000),
                            y: [6587.81, 6595, 6583.27, 6591.96]
                        },
                        {
                            x: new Date(1538866800000),
                            y: [6591.97, 6596.07, 6585, 6588.39]
                        },
                        {
                            x: new Date(1538868600000),
                            y: [6587.6, 6598.21, 6587.6, 6594.27]
                        },
                        {
                            x: new Date(1538870400000),
                            y: [6596.44, 6601, 6590, 6596.55]
                        },
                        {
                            x: new Date(1538872200000),
                            y: [6598.91, 6605, 6596.61, 6600.02]
                        },
                        {
                            x: new Date(1538874000000),
                            y: [6600.55, 6605, 6589.14, 6593.01]
                        },
                        {
                            x: new Date(1538875800000),
                            y: [6593.15, 6605, 6592, 6603.06]
                        },
                        {
                            x: new Date(1538877600000),
                            y: [6603.07, 6604.5, 6599.09, 6603.89]
                        },
                        {
                            x: new Date(1538879400000),
                            y: [6604.44, 6604.44, 6600, 6603.5]
                        },
                        {
                            x: new Date(1538881200000),
                            y: [6603.5, 6603.99, 6597.5, 6603.86]
                        },
                        {
                            x: new Date(1538883000000),
                            y: [6603.85, 6605, 6600, 6604.07]
                        },
                        {
                            x: new Date(1538884800000),
                            y: [6604.98, 6606, 6604.07, 6606]
                        }
                    ]
                }
            ],
            chart: {
                type: "candlestick",
                height: 326,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#EE3E08',
                        downward: '#4936F5'
                    },
                    wick: {
                        useFillColor: true
                    }
                }
            },
            xaxis: {
                type: "datetime",
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 6,
                tooltip: {
                    enabled: true
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoMarketPriceStatisticsChart"), options);
        chart.render();
    }

    // Sales Real-Time Sales Chart
    const salesRealTimeSalesChart = document.getElementById("salesRealTimeSalesChart");
    if (salesRealTimeSalesChart) {
        var options = {
            series: [
                {
                    name: "Sales",
                    data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3]
                }
            ],
            chart: {
                height: 240,
                type: "bar",
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    horizontal: false,
                    columnWidth: '22px',
                    borderRadiusApplication: 'around',
                    borderRadiusWhenStacked: 'all',
                    dataLabels: {
                        position: "top" // top, center, bottom
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function(val) {
                    return val + "%";
                },
                offsetY: -20,
                style: {
                    fontSize: "10px",
                    colors: ["#64748B"]
                }
            },
            xaxis: {
                show: false,
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            colors: [
                "#3584FC"
            ],
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 11,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return val + '%'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesRealTimeSalesChart"), options);
        chart.render();
    }

    // Sales Overview Chart
    const salesOverviewChart = document.getElementById("salesOverviewChart");
    if (salesOverviewChart) {
        var options = {
            series: [
                {
                    name: "Sales",
                    data: [80, 50, 30, 40, 100, 20]
                },
                {
                    name: "Sales",
                    data: [20, 30, 40, 80, 20, 80]
                },
                {
                    name: "Sales",
                    data: [30, 70, 80, 15, 45, 10]
                },
            ],
            chart: {
                height: 343,
                type: "radar",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ["2020", "2021", "2022", "2023", "2024", "2025"],
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
            },
            markers: {
                colors: 'transparent',
                strokeWidth: 0
            },
            colors: [
                "#605DFF", "#37D80A", "#FD5812"
            ],
            yaxis: {
                show: false
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesOverviewChart"), options);
        chart.render();
    }

    // Sales Gross Earnings Chart
    const salesGrossEarningsChart = document.getElementById("salesGrossEarningsChart");
    if (salesGrossEarningsChart) {
        var options = {
            series: [
                {
                    name: "Earnings",
                    data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7]
                }
            ],
            chart: {
                height: 245,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            stroke: {
                width: 4,
                curve: "smooth"
            },
            xaxis: {
                categories: [
                    "1W",
                    "2W",
                    "3W",
                    "4W",
                    "5W",
                    "6W",
                    "7W",
                    "8W",
                    "9W",
                    "10W"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            colors: [
                '#9135E8'
            ],
            yaxis: {
                show: false,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesGrossEarningsChart"), options);
        chart.render();
    }

    // Sales Recent Earnings Chart
    const salesRecentEarningsChart = document.getElementById("salesRecentEarningsChart");
    if (salesRecentEarningsChart) {
        var options = {
            series: [
                {
                    name: "Gross Earnings",
                    data: [44, 60, 41, 67, 22, 43]
                },
                {
                    name: "Tax Withheld",
                    data: [13, 30, 20, 8, 13, 27]
                },
                {
                    name: "Net Earnings",
                    data: [11, 20, 15, 15, 21, 14]
                },
            ],
            chart: {
                type: "bar",
                height: 387,
                stacked: true,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    horizontal: false,
                    columnWidth: '28px',
                    borderRadiusApplication: 'end'
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#605DFF", "#9CAAFF", "#DDE4FF"
            ],
            xaxis: {
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 125,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            fill: {
                opacity: 1
            },
            grid: {
                show: true,
                strokeDashArray: 10,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesRecentEarningsChart"), options);
        chart.render();
    }

    // Sales Total Sales Chart
    const salesTotalSalesChart = document.getElementById("salesTotalSalesChart");
    if (salesTotalSalesChart) {
        var options = {
            series: [
                {
                    name: "Sales",
                    data: [3, 7, 7, 10, 9, 7, 20]
                }
            ],
            chart: {
                type: "area",
                height: 120,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#4936F5"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "straight",
                width: 1
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesTotalSalesChart"), options);
        chart.render();
    }

    // Sales Total Orders Chart
    const salesTotalOrdersChart = document.getElementById("salesTotalOrdersChart");
    if (salesTotalOrdersChart) {
        var options = {
            series: [
                {
                    name: "Orders",
                    data: [60, 50, 40, 50, 45, 30, 50, 35, 60, 45, 30, 60]
                }
            ],
            chart: {
                type: "bar",
                height: 100,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#AD63F6"
            ],
            plotOptions: {
                bar: {
                    borderRadius: 3,
                    columnWidth: "9px",
                    borderRadiusApplication: 'end',
                    borderRadiusWhenStacked: 'last'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Sep"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                labels: {
                    show: false,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            fill: {
                opacity: 1
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesTotalOrdersChart"), options);
        chart.render();
    }

    // Sales Total Profit Chart
    const salesTotalProfitChart = document.getElementById("salesTotalProfitChart");
    if (salesTotalProfitChart) {
        var options = {
            series: [
                {
                    name: "Profit",
                    data: [3, 5, 10, 5, 9, 7, 15]
                }
            ],
            chart: {
                type: "area",
                height: 120,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3584FC"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesTotalProfitChart"), options);
        chart.render();
    }

    // Sales Total Revenue Chart
    const salesTotalRevenueChart = document.getElementById("salesTotalRevenueChart");
    if (salesTotalRevenueChart) {
        var options = {
            series: [
                {
                    name: "Revenue",
                    data: [0, 35, 25, 45, 30, 45, 25, 45, 70]
                }
            ],
            chart: {
                height: 120,
                type: "line",
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#FD5812"
            ],
            stroke: {
                width: 2,
                curve: "straight"
            },
            markers: {
                size: 3,
                strokeWidth: 0,
                hover: {
                    size: 5
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesTotalRevenueChart"), options);
        chart.render();
    }

    // Hospital Patient by Age Chart
    const hospitalPatientByAgeChart = document.getElementById("hospitalPatientByAgeChart");
    if (hospitalPatientByAgeChart) {
        var options = {
            series: [
                30, 40, 20, 10
            ],
            chart: {
                height: 295,
                type: "pie"
            },
            labels: [
                "0-18 Years", "19-40 Years", "41-60 Years", "60+ Years"
            ],
            colors: [
                "#AD63F6", "#605DFF", "#25B003", "#3584FC"
            ],
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                dropShadow: {
                    enabled: false
                }
            },
            plotOptions: {
                pie: {
                    expandOnClick: false
                }
            },
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 7
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                },
                formatter: function(seriesName, opts) {
                    return [seriesName, ":", opts.w.globals.series[opts.seriesIndex], "%"]
                },
                onItemClick: {
                    toggleDataSeries: false
                },
                onItemHover: {
                    highlightDataSeries: false
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hospitalPatientByAgeChart"), options);
        chart.render();
    }

    // Hospital Total Earnings Chart
    const hospitalTotalEarningsChart = document.getElementById("hospitalTotalEarningsChart");
    if (hospitalTotalEarningsChart) {
        var options = {
            series: [
                {
                    name: "Earnings",
                    data: [3, 7, 7, 10, 9, 11, 20]
                }
            ],
            chart: {
                type: "area",
                height: 95,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3584FC"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "straight",
                width: 1
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 7,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'diamond'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hospitalTotalEarningsChart"), options);
        chart.render();
    }

    // Hospital Emergency Room Visits Chart
    const hospitalEmergencyRoomVisitsChart = document.getElementById("hospitalEmergencyRoomVisitsChart");
    if (hospitalEmergencyRoomVisitsChart) {
        function generateData(count, yrange) {
			var i = 0;
			var series = [];
			while (i < count) {
				var x = "W" + (i + 1).toString();
				var y =
					Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
			
				series.push({
					x: x,
					y: y
				});
				i++;
			}
			return series;
		}
        var options = {
            series: [
                {
                    name: "14 PM",
                    data: generateData(14, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: "13 PM",
                    data: generateData(14, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: "12 PM",
                    data: generateData(14, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: "11 AM",
                    data: generateData(14, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: "10 AM",
                    data: generateData(14, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: "9 AM",
                    data: generateData(14, {
                        min: 0,
                        max: 90
                    })
                },
                {
                    name: "8 AM",
                    data: generateData(14, {
                        min: 0,
                        max: 90
                    })
                }
            ],
            chart: {
                height: 225,
                type: "heatmap",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#605DFF"
            ],
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hospitalEmergencyRoomVisitsChart"), options);
        chart.render();
    }

    // Hospital Critical Patients Chart
    const hospitalCriticalPatientsChart = document.getElementById("hospitalCriticalPatientsChart");
    if (hospitalCriticalPatientsChart) {
        var options = {
            series: [
                {
                    name: "Orthopedics",
                    data: [10, 15, 21, 25, 19, 15, 25, 20, 20, 15, 21, 25, 17, 18, 15, 20, 15, 20, 18, 13]
                },
                {
                    name: "Cardiology",
                    data: [3, 7, 7, 10, 9, 7, 15, 3, 7, 7, 10, 9, 7, 13, 3, 7, 7, 10, 9, 7]
                }
            ],
            chart: {
                type: "area",
                height: 120,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#FD5812", "#796DF6"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                    "11 Jan",
                    "12 Jan",
                    "13 Jan",
                    "14 Jan",
                    "15 Jan",
                    "16 Jan",
                    "17 Jan",
                    "18 Jan",
                    "19 Jan",
                    "20 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                max: 25,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hospitalCriticalPatientsChart"), options);
        chart.render();
    }

    // Hospital Bed Occupancy Rate Chart
    const hospitalBedOccupancyRateChart = document.getElementById("hospitalBedOccupancyRateChart");
    if (hospitalBedOccupancyRateChart) {
        var options = {
            series: [1275, 825, 450],
            chart: {
                height: 141,
                type: "donut"
            },
            labels: [
                "Total Beds", "Occupied Beds", "Available Beds"
            ],
            colors: [
                "#1F64F1", "#BF85FB", "#37D80A"
            ],
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: false,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '22px',
                                fontWeight: '600'
                            },
                            total: {
                                show: true,
                                color: '#64748B'
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: true
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hospitalBedOccupancyRateChart"), options);
        chart.render();
    }

    // Hospital Patient Admissions & Discharges Chart
    const hospitalPatientAdmissionsDischargesChart = document.getElementById("hospitalPatientAdmissionsDischargesChart");
    if (hospitalPatientAdmissionsDischargesChart) {
        var options = {
            series: [
                {
                    name: "Admissions",
                    data: [170, 420, 300, 550, 550, 650, 820]
                },
                {
                    name: "Discharges",
                    data: [320, 300, 650, 400, 750, 650, 600]
                }
            ],
            chart: {
                type: "area",
                height: 339,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#4936F5", "#EC1F00"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2]
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2",
                strokeDashArray: 10,
                xaxis: {
                    lines: {
                        show: true
                    }
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 1000,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hospitalPatientAdmissionsDischargesChart"), options);
        chart.render();
    }

    // Hospital Overall Visitors Chart
    const hospitalOverallVisitorsChart = document.getElementById("hospitalOverallVisitorsChart");
    if (hospitalOverallVisitorsChart) {
        var options = {
            series: [
                {
                    name: "Visitors",
                    data: [30, 70, 50, 75, 40, 80, 50, 100]
                }
            ],
            chart: {
                type: "area",
                height: 160,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#9747FF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.9
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 100,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hospitalOverallVisitorsChart"), options);
        chart.render();
    }

    // Hospital Patients Last 7 Days Chart
    const hospitalPatientsLast7DaysChart = document.getElementById("hospitalPatientsLast7DaysChart");
    if (hospitalPatientsLast7DaysChart) {
        var options = {
            series: [
                {
                    name: "Patients",
                    data: [60, 50, 40, 50, 45, 40, 60]
                }
            ],
            chart: {
                type: "bar",
                height: 100,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#FE7A36"
            ],
            plotOptions: {
                bar: {
                    borderRadius: 3,
                    columnWidth: "9px",
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                max: 60,
                min: 0,
                labels: {
                    show: false,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            fill: {
                opacity: 1
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hospitalPatientsLast7DaysChart"), options);
        chart.render();
    }

    // File Uploader
    const fileUploader = document.getElementById("fileUploader");
    if (fileUploader) {
        document.addEventListener("DOMContentLoaded", () => {
            const fileInput = document.getElementById("fileInput");
            fileInput.addEventListener("change", displayFiles);
        });
        function displayFiles() {
            const fileInput = document.getElementById("fileInput");
            const fileList = document.getElementById("fileList");
            fileList.innerHTML = "";
            if (!fileInput.files || fileInput.files.length === 0) {
                alert("Please select one or more files.");
                return;
            }
            Array.from(fileInput.files).forEach((file) => {
                const listItem = document.createElement("li");
                listItem.textContent = `File: ${file.name}, Size: ${file.size} bytes`;
                fileList.appendChild(listItem);
            });
            console.log("Files selected:", fileInput.files);
        }
    }
    const fileUploader2 = document.getElementById("fileUploader2");
    if (fileUploader2) {
        document.addEventListener("DOMContentLoaded", () => {
            const fileInput = document.getElementById("fileInput2");
            fileInput.addEventListener("change", displayFiles);
        });
        function displayFiles() {
            const fileInput = document.getElementById("fileInput2");
            const fileList = document.getElementById("fileList2");
            fileList.innerHTML = "";
            if (!fileInput.files || fileInput.files.length === 0) {
                alert("Please select one or more files.");
                return;
            }
            Array.from(fileInput.files).forEach((file) => {
                const listItem = document.createElement("li");
                listItem.textContent = `File: ${file.name}, Size: ${file.size} bytes`;
                fileList.appendChild(listItem);
            });
            console.log("Files selected:", fileInput.files);
        }
    }

    // Full Calendar
    const fullCalendar = document.getElementById("fullCalendar");
    if (fullCalendar) {
        document.addEventListener('DOMContentLoaded', function() {
            var calendarEl = document.getElementById('fullCalendar');
            var calendar = new FullCalendar.Calendar(calendarEl, {
                initialView: 'dayGridMonth',
                dayMaxEvents: true, // when too many events in a day, show the popover
                weekends: true,
                events: [
                    {
                        title: 'Annual Conference 2025',
                        date: '2025-04-01'
                    },
                    {
                        title: 'Product Lunch Webinar 2025 & Meet With Trezo Angular',
                        start: '2025-04-09',
                        end: '2025-04-10'
                    },
                    {
                        title: 'Tech Summit 2025',
                        date: '2025-04-14'
                    },
                    {
                        title: 'Web Development Seminar',
                        date: '2025-04-17'
                    },
                    {
                        title: 'Meeting with UI/UX Designers',
                        date: '2025-04-26'
                    },
                    {
                        title: 'Meeting with Developers',
                        date: '2025-04-30'
                    },
                    {
                        title: 'Annual Conference 2025',
                        date: '2025-05-10'
                    },
                    {
                        title: 'Product Lunch Webinar 2025 & Meet With Trezo Angular',
                        start: '2025-05-14',
                        end: '2025-05-16'
                    },
                    {
                        title: 'Tech Summit 2025',
                        date: '2025-05-24'
                    },
                    {
                        title: 'Meeting with UI/UX Designers',
                        date: '2025-05-26'
                    },
                    {
                        title: 'Web Development Seminar',
                        date: '2025-05-28'
                    },
                    {
                        title: 'Annual Conference 2025',
                        date: '2025-06-21'
                    },
                    {
                        title: 'Product Lunch Webinar 2025 & Meet With Trezo Angular',
                        start: '2025-06-05',
                        end: '2025-06-08'
                    },
                    {
                        title: 'Tech Summit 2025',
                        date: '2025-06-14'
                    },
                    {
                        title: 'Web Development Seminar',
                        date: '2025-06-17'
                    },
                    {
                        title: 'Meeting with UI/UX Designers',
                        date: '2025-06-26'
                    },
                    {
                        title: 'Meeting with Developers',
                        date: '2025-06-30'
                    },
                    {
                        title: 'Annual Conference 2025',
                        date: '2025-07-05'
                    },
                    {
                        title: 'Product Lunch Webinar 2025 & Meet With Trezo Angular',
                        start: '2025-07-09',
                        end: '2025-07-11'
                    },
                    {
                        title: 'Tech Summit 2025',
                        date: '2025-07-20'
                    },
                    {
                        title: 'Meeting with UI/UX Designers',
                        date: '2025-07-26'
                    },
                    {
                        title: 'Web Development Seminar',
                        date: '2025-07-29'
                    },
                    {
                        title: 'Web Development Seminar',
                        date: '2025-08-10'
                    },
                    {
                        title: 'Web Development Seminar',
                        date: '2025-08-15'
                    },
                    {
                        title: 'Web Development Seminar',
                        date: '2025-08-20'
                    }
                ]
            });
            calendar.render();
        });
    }

    // Quill Rich Text Editor
    const richTextEditor = document.getElementById("richTextEditor");
    if (richTextEditor) {
        let quill = new Quill('#richTextEditor', {
            theme: 'snow'
        });
    }

    // Trezo Tabs
    const trezoTabsID = document.getElementById("trezo-tabs");
    if (trezoTabsID) {
        document.addEventListener("DOMContentLoaded", function() {
            // Function to handle tab switching for each tab group
            function setupTabs() {
                const tabGroups = document.querySelectorAll('.trezo-tabs');
                tabGroups.forEach((group) => {
                    const tabs = group.querySelectorAll(".nav-link");
                    const contents = group.querySelectorAll(".tab-pane");
                    tabs.forEach(tab => {
                        tab.addEventListener("click", function() {
                            // Remove 'active' class from all tabs and hide all contents
                            tabs.forEach(t => t.classList.remove("active"));
                            contents.forEach(content => content.classList.remove("active"));
                            // Add 'active' class to the clicked tab and show the corresponding content
                            tab.classList.add("active");
                            const contentId = tab.getAttribute("data-tab");
                            document.getElementById(contentId).classList.add("active");
                        });
                    });
                    // Set the first tab as the default active tab
                    if (tabs.length > 0) {
                        tabs[0].click();
                    }
                });
            }
            // Initialize tabs for all groups
            setupTabs();
        });
    }

    // Input Counter
    const inputCounter = document.getElementById("inputCounter");
    if (inputCounter) {
        document.querySelectorAll('.counter-container').forEach(container => {
            const counter = container.querySelector('.counter');
                const increaseBtn = container.querySelector('.increase-btn');
                const decreaseBtn = container.querySelector('.decrease-btn');

                increaseBtn.addEventListener('click', () => {
                    counter.value = parseInt(counter.value) + 1;
                });

                decreaseBtn.addEventListener('click', () => {
                if (parseInt(counter.value) > 0) { // Optional to prevent negative values
                    counter.value = parseInt(counter.value) - 1;
                }
            });
        });
    }

    // Custom Tooltip
    const customTooltip = document.getElementById("customTooltip");
    if (customTooltip) {
        const tooltipElements = document.querySelectorAll('.custom-tooltip');
        tooltipElements.forEach((element) => {
            // Create the tooltip text element
            const tooltipText = document.createElement('span');
            tooltipText.classList.add('tooltip-text');
            tooltipText.textContent = element.getAttribute('data-text');
            element.appendChild(tooltipText);

            // Show tooltip on hover
            element.addEventListener('mouseenter', () => {
                tooltipText.style.visibility = 'visible';
                tooltipText.style.opacity = '1';
            });

            // Hide tooltip when hover ends
            element.addEventListener('mouseleave', () => {
                tooltipText.style.visibility = 'hidden';
                tooltipText.style.opacity = '0';
            });
        });
    }

    // Custom Popover
    const customPopover = document.getElementById("customPopover");
    if (customPopover) {
        const popoverElements = document.querySelectorAll('.custom-popover');
        popoverElements.forEach((element) => {
            // Create the popover text element
            const popoverText = document.createElement('span');
            popoverText.classList.add('popover-text');
            popoverText.textContent = element.getAttribute('data-text');
            element.appendChild(popoverText);
        
            // Toggle popover visibility on click
            element.addEventListener('click', (e) => {
                // Prevent the click event from propagating to the document click listener
                e.stopPropagation();
        
                // Toggle visibility and opacity of the popover
                const isVisible = popoverText.style.visibility === 'visible';
                popoverText.style.visibility = isVisible ? 'hidden' : 'visible';
                popoverText.style.opacity = isVisible ? '0' : '1';
            });
        });
        
        // Close any popover if clicked outside
        document.addEventListener('click', () => {
            // Loop through each popover and hide them
            popoverElements.forEach((element) => {
                const popoverText = element.querySelector('.popover-text');
                popoverText.style.visibility = 'hidden';
                popoverText.style.opacity = '0';
            });
        });
    }

    // Seller Details Revenue Chart
    const sellerRevenueChart = document.getElementById("sellerRevenueChart");
    if (sellerRevenueChart) {
        var options = {
            series: [
                {
                    name: "Orders",
                    data: [28, 50, 90, 95, 20, 70, 35]
                },
                {
                    name: "Earnings",
                    data: [80, 60, 70, 30, 45, 20, 80]
                },
                {
                    name: "Refunds",
                    data: [32, 23, 78, 35, 65, 35, 15]
                },
                {
                    name: "Conversion Rate",
                    data: [60, 25, 80, 25, 15, 40, 15]
                }
            ],
            chart: {
                type: "bar",
                height: 437,
                toolbar: {
                    show: true
                }
            },
            colors: [
                "#605DFF", "#3584FC", "#AD63F6", "#FD5812"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "50%"
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 5,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#sellerRevenueChart"), options);
        chart.render();
    }

    // Product Details Image Slides
    const productDetailsImageSlides = document.getElementById("productDetailsImageSlides");
    if (productDetailsImageSlides) {
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            freeMode: true,
            spaceBetween: 25,
            slidesPerView: 3,
            watchSlidesProgress: true
        });
        var swiper2 = new Swiper(".mySwiper2", {
            loop: true,
            thumbs: {
                swiper: swiper
            }
        });
    }

    // Tables Of Content Accordion
    const tablesOfContentAccordion = document.getElementById("tablesOfContentAccordion");
    if (tablesOfContentAccordion) {
        function initializeAccordions() {
            const accordions = document.querySelectorAll('.toc-accordion-button');
            accordions.forEach((accordion) => {
                accordion.addEventListener('click', function () {
                    // Close all panels in the current accordion level
                    let siblingAccordions = Array.from(this.closest('.toc-accordion-collapse')?.querySelectorAll('.toc-accordion-button') || accordions);
                    siblingAccordions.forEach((acc) => {
                        if (acc !== accordion) {
                            acc.classList.remove('open');
                            acc.setAttribute('aria-expanded', 'false');
                            acc.nextElementSibling.style.display = 'none';
                        }
                    });
                    // Toggle current panel
                    this.classList.toggle('open');
                    const panel = this.nextElementSibling;
                    if (panel.style.display === 'block') {
                        panel.style.display = 'none';
                        this.setAttribute('aria-expanded', 'false');
                    } else {
                        panel.style.display = 'block';
                        this.setAttribute('aria-expanded', 'true');
                    }
                });
            });
        }
        document.addEventListener('DOMContentLoaded', () => {
            initializeAccordions();
        });
    }

    // Reports Support Overview Chart
    const reportsSupportOverviewChart = document.getElementById("reportsSupportOverviewChart");
    if (reportsSupportOverviewChart) {
        var options = {
            series: [
                55, 44, 30, 12
            ],
            chart: {
                height: 178,
                type: "pie"
            },
            labels: [
                "Solved", "In Progress", "Pending", "Unassigned"
            ],
            colors: [
                "#37D80A", "#605DFF", "#AD63F6", "#FD5812"
            ],
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    expandOnClick: false
                }
            },
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 7
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#reportsSupportOverviewChart"), options);
        chart.render();
    }

    // Reports New vs Solved Chart
    const reportsNewVsSolvedTicketsChart = document.getElementById("reportsNewVsSolvedTicketsChart");
    if (reportsNewVsSolvedTicketsChart) {
        var options = {
            series: [
                {
                    name: "New Tickets",
                    data: [25, 70, 25, 45, 60, 55, 70]
                },
                {
                    name: "Solved Tickets",
                    data: [65, 45, 65, 30, 75, 24, 50]
                }
            ],
            chart: {
                type: "area",
                height: 369,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF", "#FD5812"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: 2
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.6
                }
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 80,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#reportsNewVsSolvedTicketsChart"), options);
        chart.render();
    }

    // Password Show/Hide
    const passwordHideShow = document.getElementById("passwordHideShow");
    if (passwordHideShow) {
        document.getElementById("toggleButton").addEventListener("click", function() {
            const passwordInput = document.getElementById("password");
            const icon = this.querySelector("i");
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                icon.classList.replace("ri-eye-off-line", "ri-eye-line"); // Change icon to "hide" mode
            } else {
                passwordInput.type = "password";
                icon.classList.replace("ri-eye-line", "ri-eye-off-line"); // Change icon to "show" mode
            }
        });
    }
    const passwordHideShow2 = document.getElementById("passwordHideShow2");
    if (passwordHideShow2) {
        document.getElementById("toggleButton2").addEventListener("click", function() {
            const passwordInput = document.getElementById("password2");
            const icon = this.querySelector("i");
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                icon.classList.replace("ri-eye-off-line", "ri-eye-line"); // Change icon to "hide" mode
            } else {
                passwordInput.type = "password";
                icon.classList.replace("ri-eye-line", "ri-eye-off-line"); // Change icon to "show" mode
            }
        });
    }
    const passwordHideShow3 = document.getElementById("passwordHideShow3");
    if (passwordHideShow3) {
        document.getElementById("toggleButton3").addEventListener("click", function() {
            const passwordInput = document.getElementById("password3");
            const icon = this.querySelector("i");
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                icon.classList.replace("ri-eye-off-line", "ri-eye-line"); // Change icon to "hide" mode
            } else {
                passwordInput.type = "password";
                icon.classList.replace("ri-eye-line", "ri-eye-off-line"); // Change icon to "show" mode
            }
        });
    }

    // Coming Soon Countdown Timer
    const comingSoonCountDown = document.getElementById("comingSoonCountDown");
    if (comingSoonCountDown) {
        // Set the date we're counting down to
        const countdownDate = new Date("2025-12-31T23:59:59").getTime();

        // Update the countdown every second
        const interval = setInterval(() => {
            // Get today's date and time
            const now = new Date().getTime();

            // Find the distance between now and the countdown date
            const distance = countdownDate - now;

            // Calculate days, hours, minutes, and seconds
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the elements
            document.getElementById("days").textContent = days;
            document.getElementById("hours").textContent = hours;
            document.getElementById("minutes").textContent = minutes;
            document.getElementById("seconds").textContent = seconds;

            // If the countdown is over, display a message
            if (distance < 0) {
                clearInterval(interval);
                document.querySelector(".countdown").innerHTML = "Countdown Ended";
            }
        }, 1000);
    }

    // Dismissing Alerts
    const dismissingAlert = document.getElementById("dismissingAlert");
    if (dismissingAlert) {
        document.addEventListener("DOMContentLoaded", function() {
            // Select all alert close buttons
            const closeButtons = document.querySelectorAll(".alert .close-btn");
            // Add click event listeners to each close button
            closeButtons.forEach(button => {
                button.addEventListener("click", function() {
                    // Hide the parent alert div when the close button is clicked
                    button.parentElement.style.display = 'none';
                });
            });
        });
    }

    // jsVectorMap
    const getJsVectorMapID = document.getElementById('salesByLocationsJsVectorMap');
	if (getJsVectorMapID) {
		var markers = [
			{ name: "United States", coords: [26.8206, 30.8025] },
			{ name: "Germany", coords: [61.524, 105.3188] },
			{ name: "United Kingdom", coords: [56.1304, -106.3468] },
			{ name: "Canada", coords: [71.7069, -42.6043] },
			{ name: "Portugal", coords: [80.7069, -70.6043] },
			{ name: "Spain", coords: [0.7069, -40.6043] },
		];
		var jvm = new jsVectorMap({
			map: "world_merc",
			selector: "#salesByLocationsJsVectorMap",
			// zoomButtons: true,
			onLoaded(map) {
				window.addEventListener("resize", () => {
					map.updateSize();
				});
			},
			regionStyle: {
			   initial: { fill: '#d1d4db' }
			},
			labels: {
				markers: {
					render: (marker) => marker.name
				}
			},
			markersSelectable: true,
			selectedMarkers: markers.map((marker, index) => {
				var name = marker.name;
				if (name === "Russia" || name === "Brazil") {
					return index;
				}
			}),
			markers: markers,
			markerStyle: {
				initial: { fill: "#5c5cff" },
				selected: { fill: "#ff5050" }
			},
			markerLabelStyle: {
				initial: {
					fontFamily: "Inter",
					fontWeight: 400,
					fontSize: 0
				}
			}
		});
	}
    const topCountriesVectorMapID = document.getElementById('topCountriesVectorMap');
	if (topCountriesVectorMapID) {
		var markers = [
			{ name: "United States", coords: [26.8206, 30.8025] },
		];
		var jvm = new jsVectorMap({
			map: "world_merc",
			selector: "#topCountriesVectorMap",
			// zoomButtons: true,
			onLoaded(map) {
				window.addEventListener("resize", () => {
					map.updateSize();
				});
			},
			regionStyle: {
			   initial: { fill: '#ffffff' }
			},
			labels: {
				markers: {
					render: (marker) => marker.name
				}
			},
			markersSelectable: true,
			selectedMarkers: markers.map((marker, index) => {
				var name = marker.name;
				if (name === "Russia" || name === "Brazil") {
					return index;
				}
			}),
			markers: markers,
			markerStyle: {
				initial: { fill: "#ffffff" },
				selected: { fill: "#ffffff" }
			},
			markerLabelStyle: {
				initial: {
					fontFamily: "Inter",
					fontWeight: 400,
					fontSize: 0
				}
			}
		});
	}

    // Front Page Navbar Sticky
    const getNavbarID = document.getElementById("navbar");
    if (getNavbarID) {
        window.addEventListener('scroll', event => {
            const height = 150;
            const { scrollTop } = event.target.scrollingElement;
            document.querySelector('#navbar').classList.toggle('is-sticky', scrollTop >= height);
        });
    }

    // Front Page Navbar Collapse
    const getNavbarBurgerMenuID = document.getElementById("navbar-burger-menu");
    if (getNavbarBurgerMenuID) {
        const button = document.getElementById('navbar-burger-menu');
        const div = document.getElementById('navbar-collapse');
        button.addEventListener('click', function() {
            button.classList.toggle('active'); // Toggle active class on the button
            div.classList.toggle('active');    // Toggle active class on the div
        });
    }

    // Front Page Team Slides
    const frontPageTeamSlides = document.getElementById("frontPageTeamSlides");
    if (frontPageTeamSlides) {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 25,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            }
        });
    }

    // Copy/Cut Clipboard
    const copyClipboardID = document.getElementById("copyClipboard");
    if (copyClipboardID) {
        // Add event listener to all copy buttons
        document.querySelectorAll('.copyClipboardButton').forEach(button => {
            button.addEventListener('click', function () {
                const inputId = this.getAttribute('data-input'); // Get the associated input field ID
                const inputField = document.getElementById(inputId); // Find the input field
                const icon = this.querySelector('i'); // Get the icon inside the button

                // Select and copy the input field value
                inputField.select();
                inputField.setSelectionRange(0, 99999); // For mobile devices

                navigator.clipboard.writeText(inputField.value)
                .then(() => {
                    // Change the icon to a success icon
                    icon.classList.remove('ri-file-copy-line');
                    icon.classList.add('ri-check-line');

                    // Remove button text temporarily
                    this.innerHTML = '';
                    this.appendChild(icon);

                    // Revert back to the original icon and text after 2 seconds
                    setTimeout(() => {
                        icon.classList.remove('ri-check-line');
                        icon.classList.add('ri-file-copy-line');
                        this.innerHTML = '';
                        this.appendChild(icon);
                        this.append(' Copy');
                    }, 2000);
                })
                .catch(err => {
                    console.error('Error copying text: ', err);
                });
            });
        });
    }
    const cutClipboardID = document.getElementById("cutClipboard");
    if (cutClipboardID) {
        // Function to change the button icon and handle the cut action
        function handleButtonClick(button) {
            const inputId = button.getAttribute('data-input'); // Get the associated input field ID
            const inputField = document.getElementById(inputId); // Find the input field
            const icon = button.querySelector('i'); // Get the icon inside the button

            // Perform cut: copy the text and then clear the input
            navigator.clipboard.writeText(inputField.value)
                .then(() => {
                    inputField.value = ''; // Clear the input after cutting
                    icon.classList.remove('ri-scissors-line');
                    icon.classList.add('ri-checkbox-circle-line');
                    button.innerHTML = '';
                    button.appendChild(icon);

                    setTimeout(() => {
                        icon.classList.remove('ri-checkbox-circle-line');
                        icon.classList.add('ri-scissors-line');
                        button.innerHTML = '';
                        button.appendChild(icon);
                        button.append(' Cut');
                    }, 2000);
                })
                    .catch(err => {
                    console.error('Error cutting text: ', err);
                });
            }

            // Add event listener to all cut buttons
            document.querySelectorAll('.cutClipboardButton').forEach(button => {
            button.addEventListener('click', function () {
                handleButtonClick(this);
            });
        });
    }

    // Clipboard
    new ClipboardJS('.copy-btn');

    // Click to See Code
    const clickToSeeCodeID = document.getElementById("clickToSeeCode");
    if (clickToSeeCodeID) {
        const buttons = document.querySelectorAll(".clickToSeeCodeBtn");
        buttons.forEach(button => {
            button.addEventListener("click", function() {
                const targetId = button.getAttribute("data-target");
                const targetDiv = document.getElementById(targetId);
                
                // Toggle the active class
                targetDiv.classList.toggle("active");
                
                // Change the button text based on the div's state
                if (targetDiv.classList.contains("active")) {
                    button.textContent = "Click to Hide Code:"; // E.g., "Hide Div 1"
                } else {
                    button.textContent = "Click to See Code:"; // E.g., "Show Div 1"
                }
            });
        });
    }

    // Data Table
    const dataTableID = document.getElementById("dataTable");
    if (dataTableID) {
        // Add event listeners to headers for sorting
        const headers = document.querySelectorAll('#dataTable thead th');
        headers.forEach((header, index) => {
            header.addEventListener('click', () => {
                const table = document.getElementById('dataTable');
                const tbody = table.querySelector('tbody');
                const rows = Array.from(tbody.querySelectorAll('tr'));

                // Determine the sort direction
                const isAscending = header.classList.contains('asc');
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                header.classList.toggle('asc', !isAscending);
                header.classList.toggle('desc', isAscending);

                // Sort rows
                const sortedRows = rows.sort((a, b) => {
                    const aText = a.children[index].innerText.toLowerCase();
                    const bText = b.children[index].innerText.toLowerCase();

                    // Numeric comparison for ID and Age columns
                    if (index === 0 || index === 2) {
                        return isAscending
                        ? parseInt(bText) - parseInt(aText)
                        : parseInt(aText) - parseInt(bText);
                    }

                    // String comparison for other columns (including the new City column)
                    if (aText < bText) return isAscending ? 1 : -1;
                    if (aText > bText) return isAscending ? -1 : 1;
                    return 0;
                });

                // Append sorted rows back to the tbody
                sortedRows.forEach(row => tbody.appendChild(row));
            });
        });

        // Filter table rows by search input
        const searchInput = document.getElementById('dataTableSearchInput');
        const noResultsMessage = document.getElementById('noResultsMessage');
        searchInput.addEventListener('keyup', function () {
            const query = searchInput.value.toLowerCase();
            const rows = document.querySelectorAll('#dataTable tbody tr');
            let visibleRows = 0;

            rows.forEach(row => {
                const isVisible = Array.from(row.children).some(cell =>
                    cell.textContent.toLowerCase().includes(query)
                );
                if (isVisible) {
                    row.style.display = '';
                    visibleRows++;
                } else {
                    row.style.display = 'none';
                }
            });

            // Show or hide the "No results found" message
            if (visibleRows === 0) {
                noResultsMessage.style.display = 'block';
            } else {
                noResultsMessage.style.display = 'none';
            }
        });
    }

    // HRM Total Employees Chart
    const hrmTotalEmployeesChart = document.getElementById("hrmTotalEmployeesChart");
    if (hrmTotalEmployeesChart) {
        var options = {
            series: [
                {
                    name: "Employees",
                    data: [3, 12, 8, 13, 8, 10, 16]
                }
            ],
            chart: {
                type: "area",
                height: 125,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#4936F5"
            ],
            dataLabels: {
                enabled: false
            },
            fill: {
                type: "gradient",
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100]
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "monotoneCubic",
                width: 0
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 6,
                show: false,
                // max: 150,
                // min: 0,
                labels: {
                    // formatter: (val) => {
                    //     return val + 'k'
                    // },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hrmTotalEmployeesChart"), options);
        chart.render();
    }

    // HRM Resigned Employees Chart
    const hrmResignedEmployeesChart = document.getElementById("hrmResignedEmployeesChart");
    if (hrmResignedEmployeesChart) {
        var options = {
            series: [
                {
                    name: "Employees",
                    data: [60, 35, 55, 30, 45, 30, 55]
                }
            ],
            chart: {
                type: "bar",
                height: 110,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#FD5812"
            ],
            plotOptions: {
                bar: {
                    borderRadius: 3,
                    columnWidth: "8px"
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                labels: {
                    show: false,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            fill: {
                opacity: 1
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hrmResignedEmployeesChart"), options);
        chart.render();
    }

    // HRM New Employees Chart
    const hrmNewEmployeesChart = document.getElementById("hrmNewEmployeesChart");
    if (hrmNewEmployeesChart) {
        var options = {
            chart: {
				width: 120,
				height: 120,
				type: "radialBar"
			},
			series: [
                30
            ],
			colors: [
                "#9135E8"
            ],
			plotOptions: {
				radialBar: {
					track: {
						background: "#EDEEF0"
					},
					dataLabels: {
						name: {
							show: false
						},
						value: {
							show: true,
							offsetY: 5,
							fontWeight: 500,
							color: "#9135E8",
							fontSize: "14px"
						}
					}
				}
			},
			stroke: {
				lineCap: 'round'
			}
        };
        var chart = new ApexCharts(document.querySelector("#hrmNewEmployeesChart"), options);
        chart.render();
    }

    // HRM Employee Attendance Trends Chart
    const hrmEmployeeAttendanceTrendsChart = document.getElementById("hrmEmployeeAttendanceTrendsChart");
    if (hrmEmployeeAttendanceTrendsChart) {
        var options = {
            series: [
                {
					name: "Attendance",
					data: [170, 450, 400, 550, 550, 650, 820]
				},
				{
					name: "Absent",
					data: [320, 300, 650, 400, 750, 650, 600]
				}
            ],
            chart: {
                type: "area",
                height: 424,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF", "#EE3E08"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                strokeDashArray: 7,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "straight",
                width: [2, 2]
            },
            fill: {
				type: 'gradient',
				gradient: {
					stops: [0, 90, 100],
					shadeIntensity: 1,
					opacityFrom: 0,
					opacityTo: 0.8
				}
			},
            xaxis: {
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                axisTicks: {
                    show: false,
                    color: '#D5D9E2'
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 6,
                max: 960,
                min: 0,
                labels: {
                    // formatter: (val) => {
                    //     return '$' + val + 'k'
                    // },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                axisTicks: {
                    show: false,
                    color: '#D5D9E2'
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 12,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hrmEmployeeAttendanceTrendsChart"), options);
        chart.render();
    }

    // HRM Employee Work Format Chart
    const hrmEmployeeWorkFormatChart = document.getElementById("hrmEmployeeWorkFormatChart");
    if (hrmEmployeeWorkFormatChart) {
        var options = {
            series: [120, 160, 50, 20],
            chart: {
                height: 215,
                type: "donut"
            },
            labels: [
                "Remote", "In-office", "Hybrid", "Shift"
            ],
            colors: [
                "#FD5812", "#605DFF", "#37D80A", "#AD63F6"
            ],
            stroke: {
                width: 1,
                show: true,
                colors: ["#ffffff"]
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '22px',
                                fontWeight: '600',
                                offsetY: 2
                            },
                            total: {
                                show: true,
                                fontSize: '14px',
                                color: '#64748B'
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false
            }
        };
        var chart = new ApexCharts(document.querySelector("#hrmEmployeeWorkFormatChart"), options);
        chart.render();
    }

    // HRM Employee Salary Chart
    const hrmEmployeeSalaryChart = document.getElementById("hrmEmployeeSalaryChart");
    if (hrmEmployeeSalaryChart) {
        const data = [70, 60, 80, 100, 70, 40, 80];
        const middleIndex = Math.floor(data.length / 2);
        var options = {
            series: [
                {
                    name: "Employee Salary",
                    data: data
                }
            ],
            chart: {
                type: "bar",
                height: 283,
                toolbar: {
                    show: false
                }
            },
            colors: data.map((_, index) =>
                index === middleIndex ? '#9135E8' : '#E9D5FF'
            ),
            plotOptions: {
                bar: {
                    columnWidth: "22px",
                    borderRadius: 4,
                    distributed: true,
                    horizontal: false
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                tickAmount: 5,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hrmEmployeeSalaryChart"), options);
        chart.render();
    }

    // Current Day/Date
    const currentDayDate = document.getElementById("currentDayDate");
    if (currentDayDate) {

        // Get the current date
        const today = new Date();

        // Format the date as "Month Day, Year" (e.g., "November 18, 2025")
        const formattedDate = today.toLocaleDateString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        });

        // Display the date in the HTML element
        document.getElementById('currentDate').textContent = formattedDate;

    }

    // School Attendance Analytics Chart
    const schoolAttendanceAnalyticsChart = document.getElementById("schoolAttendanceAnalyticsChart");
    if (schoolAttendanceAnalyticsChart) {
        var options = {
            series: [
				{
					name: "Teachers",
					data: [500, 600, 250, 600, 200, 500, 600, 120, 250, 500, 200, 250]
				},
				{
					name: "Boys",
					data: [200, 300, 200, 400, 200, 250, 350, 120, 250, 300, 120, 200]
				},
				{
					name: "Girls",
					data: [150, 250, 200, 300, 300, 150, 200, 300, 200, 250, 400, 200]
				},
			],
            chart: {
				type: "bar",
				height: 353,
				stacked: true,
				toolbar: {
					show: false
				},
				zoom: {
					enabled: true
				}
			},
			plotOptions: {
				bar: {
					borderRadius: 7,
					horizontal: false,
					columnWidth: '15px',
					borderRadiusApplication: 'end'
				}
			},
            dataLabels: {
				enabled: false
			},
			colors: [
				"#605DFF", "#9CAAFF", "#DDE4FF"
			],
            grid: {
                show: true,
                strokeDashArray: 7,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#D5D9E2'
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                axisTicks: {
                    show: false,
                    color: '#D5D9E2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 5
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#schoolAttendanceAnalyticsChart"), options);
        chart.render();
    }

    // School Students Overview Chart
    const schoolStudentsOverviewChart = document.getElementById("schoolStudentsOverviewChart");
    if (schoolStudentsOverviewChart) {
        var options = {
			series: [
				{
					name: "Boys",
					data: [70, 42, 70, 120, 40, 70, 90]
				},
				{
					name: "Girls",
					data: [-70, -44, -70, -120, -40, -70, -90]
				}
			],
			chart: {
				type: 'bar',
				height: 303,
				stacked: true,
				toolbar: {
					show: false
				}
			},
			colors: [
                '#3584FC', '#FD5812'
            ],
			plotOptions: {
				bar: {
					borderRadius: 6,
					columnWidth: '12px',
					borderRadiusApplication: "end",
					borderRadiusWhenStacked: "all"
				}
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
                strokeDashArray: 7,
                borderColor: "#ECEEF2",
				xaxis: {
					lines: {
						show: true
					}
				},
				yaxis: {
					lines: {
						show: false
					}
				}
			},
			legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
			},
			xaxis: {
				categories: [
					"Sun",
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri",
					"Sat",
				],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
			},
			yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
			},
            tooltip: {
                y: {
                    formatter: function (value) {
                        return Math.abs(value);  // Ensure that negative values appear as positive in the tooltip
                    }
                }
            }
		};
        var chart = new ApexCharts(document.querySelector("#schoolStudentsOverviewChart"), options);
        chart.render();
    }

    // School New Admissions Chart
    const schoolNewAdmissionsChart = document.getElementById("schoolNewAdmissionsChart");
    if (schoolNewAdmissionsChart) {
        var options = {
			series: [
                45, 220, 180, 375, 455
            ],
			chart: {
				height: 381,
				type: "donut"
			},
			labels: [
				"Music", "History", "Art", "English", "Mathematics"
			],
			colors: [
				"#90C7FF", "#AD63F6", "#605DFF", "#FD5812", "#37D80A"
			],
			stroke: {
				show: false
			},
			plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        size: '75%',
                        labels: {
                            show: true,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '28px',
                                fontWeight: '600'
                            },
                            total: {
                                show: true,
                                color: '#64748B'
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
			legend: {
                show: true,
                fontSize: '13px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 10,
                    vertical: 9
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    shape: 'circle'
                },
                formatter: function(seriesName, opts) {
                    return seriesName + ": <strong>" + opts.w.globals.series[opts.seriesIndex] + "</strong>";
                }
			}
		};
        var chart = new ApexCharts(document.querySelector("#schoolNewAdmissionsChart"), options);
        chart.render();
    }

    // School Upcoming Events Slides
    const schoolUpcomingEventsSlides = document.getElementById("schoolUpcomingEventsSlides");
    if (schoolUpcomingEventsSlides) {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            }
        });
    }

    // Call Center Total Calls Chart
    const callCenterTotalCallsChart = document.getElementById("callCenterTotalCallsChart");
    if (callCenterTotalCallsChart) {
        var options = {
            series: [
                {
                    name: "Total Calls",
                    data: [1200, 1150, 1355, 1460, 1550, 1260, 1455, 1860, 1700, 1740, 2095, 2180]
                }
            ],
            chart: {
                type: "area",
                height: 334,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2, 0],
                dashArray: [0, 6, 0]
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                // max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#callCenterTotalCallsChart"), options);
        chart.render();
    }

    // Call Center Answered Calls Chart
    const callCenterAnsweredCallsChart = document.getElementById("callCenterAnsweredCallsChart");
    if (callCenterAnsweredCallsChart) {
        var options = {
            series: [
                {
                    name: "Answered Calls",
                    data: [1455, 1860, 1700, 1740, 2095, 2180, 1200, 1150, 1355, 1460, 1550, 1260]
                }
            ],
            chart: {
                type: "area",
                height: 334,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#AD63F6"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2, 0],
                dashArray: [0, 6, 0]
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                // max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#callCenterAnsweredCallsChart"), options);
        chart.render();
    }

    // Call Center Missed Calls Chart
    const callCenterMissedCallsChart = document.getElementById("callCenterMissedCallsChart");
    if (callCenterMissedCallsChart) {
        var options = {
            series: [
                {
                    name: "Missed Calls",
                    data: [1200, 1150, 1355, 2095, 2180, 1460, 1700, 1740, 1550, 1260, 1455, 1860]
                }
            ],
            chart: {
                type: "area",
                height: 334,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#fd5812"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2, 0],
                dashArray: [0, 6, 0]
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                // max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#callCenterMissedCallsChart"), options);
        chart.render();
    }

    // Call Center Inbound Calls Chart
    const callCenterInboundCallsChart = document.getElementById("callCenterInboundCallsChart");
    if (callCenterInboundCallsChart) {
        var options = {
            series: [
                {
                    name: "Inbound Calls",
                    data: [100, 130, 115, 170, 110, 120, 160, 100, 200, 105, 130, 130, 170, 150, 155, 190, 165]
                }
            ],
            chart: {
                type: "area",
                height: 162,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 1
            },
            colors: [
                "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                    "11 Jan",
                    "12 Jan",
                    "13 Jan",
                    "14 Jan",
                    "15 Jan",
                    "16 Jan",
                    "17 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 220,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#callCenterInboundCallsChart"), options);
        chart.render();
    }

    // Call Center Outbound Calls Chart
    const callCenterOutboundCallsChart = document.getElementById("callCenterOutboundCallsChart");
    if (callCenterOutboundCallsChart) {
        var options = {
            series: [
                {
                    name: "Outbound Calls",
                    data: [100, 130, 115, 170, 110, 120, 160, 100, 200, 105, 130, 130, 170, 150, 155, 190, 165]
                }
            ],
            chart: {
                type: "area",
                height: 162,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: 1
            },
            colors: [
                "#9135E8"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "01 Jan",
                    "02 Jan",
                    "03 Jan",
                    "04 Jan",
                    "05 Jan",
                    "06 Jan",
                    "07 Jan",
                    "08 Jan",
                    "09 Jan",
                    "10 Jan",
                    "11 Jan",
                    "12 Jan",
                    "13 Jan",
                    "14 Jan",
                    "15 Jan",
                    "16 Jan",
                    "17 Jan"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 220,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#callCenterOutboundCallsChart"), options);
        chart.render();
    }

    // Call Center Agent Avg. Earnings Chart
    const callCenterAgentAvgEarningsChart = document.getElementById("callCenterAgentAvgEarningsChart");
    if (callCenterAgentAvgEarningsChart) {
        var options = {
            series: [
				{
					name: "Earnings",
					data: [20, 40, 60, 60, 50, 30, 40, 30, 40, 40, 60, 60]
				}
			],
			chart: {
				type: "area",
				height: 275,
				zoom: {
					enabled: false
				},
				toolbar: {
					show: false
				}
			},
			colors: [
				"#9135E8"
			],
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: "stepline", //curve: ['straight', 'smooth', 'monotoneCubic', 'stepline']
				width: 3,
				lineCap: "10"
			},
			grid: {
				borderColor: '#ECF0FF', 
				strokeDashArray: 10,
				xaxis: {
					lines: {
						show: false
					}
				}
			},
			fill: {
				type: 'gradient',
				gradient: {
					stops: [0, 90, 100],
					shadeIntensity: 1,
					opacityFrom: 0,
					opacityTo: 0.8
				}
			},
			xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
			},
			yaxis: {
                tickAmount: 4,
                show: false,
                max: 80,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
			},
			legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
			}
        };
        var chart = new ApexCharts(document.querySelector("#callCenterAgentAvgEarningsChart"), options);
        chart.render();
    }

    // Marketing Instagram Subscriber Chart
    const marketingInstagramSubscribersChart = document.getElementById("marketingInstagramSubscribersChart");
    if (marketingInstagramSubscribersChart) {
        var options = {
			series: [
				{
					name: "Gained",
					data: [70, 42, 70, 120, 40, 70, 90, 70, 25, 70, 120, 40]
				},
				{
					name: "Lost",
					data: [-70, -44, -70, -120, -40, -70, -120, -70, -30, -70, -80, -40]
				}
			],
			chart: {
				type: 'bar',
				height: 371,
				stacked: true,
				toolbar: {
					show: false
				}
			},
			colors: [
                '#605DFF', '#C2CDFF'
            ],
			plotOptions: {
				bar: {
					borderRadius: 3,
					columnWidth: '24px',
					borderRadiusApplication: "end",
					borderRadiusWhenStacked: "all"
				}
			},
			dataLabels: {
				enabled: false,
			},
            grid: {
                show: true,
                strokeDashArray: 7,
                borderColor: "#ECEEF2"
            },
			legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
			},
			xaxis: {
				categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
				],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
			},
			yaxis: {
                // tickAmount: 5,
                // max: 50,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return val + 'K'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
			},
            // tooltip: {
            //     y: {
            //         formatter: function (value) {
            //             return Math.abs(value) + "k followers";  // Ensure that negative values appear as positive in the tooltip
            //         }
            //     }
            // }
		};
        var chart = new ApexCharts(document.querySelector("#marketingInstagramSubscribersChart"), options);
        chart.render();
    }

    // Marketing Instagram Campaigns Chart
    const marketingInstagramCampaignsChart = document.getElementById("marketingInstagramCampaignsChart");
    if (marketingInstagramCampaignsChart) {
        var options = {
            series: [
                {
                    name: "Budget",
                    data: [80, 200, 90, 220, 110, 220, 85]
                },
                {
                    name: "Followers",
                    data: [20, 120, 155, 90, 165, 100, 120]
                }
            ],
            chart: {
                type: "area",
                height: 140,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: 2
            },
            colors: [
                "#AD63F6", "#FF6D57"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 5,
                show: false,
                max: 250,
                // min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            tooltip: {
                y: {
                    formatter: function (value, { seriesIndex }) {
                        if (seriesIndex === 0) {
                            return "$" + value;
                        }
                        return value;
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#marketingInstagramCampaignsChart"), options);
        chart.render();
    }

    // Marketing Performance Overview Chart
    const marketingPerformanceOverviewChart = document.getElementById("marketingPerformanceOverviewChart");
    if (marketingPerformanceOverviewChart) {
        var options = {
            series: [
                {
                    name: 'Social Campaigns',
                    data: [[100, 20, 50]]
                },
                {
                    name: 'Email Newsletter',
                    data: [[300, 50, 70]]
                },
                {
                    name: 'TV Campaign',
                    data: [[500, 80, 80]]
                },
                {
                    name: 'Google Ads',
                    data: [[650, 40, 50]]
                },
                {
                    name: 'Courses',
                    data: [[850, 60, 70]]
                },
                {
                    name: 'Radio',
                    data: [[900, 20, 60]]
                }
            ],
            chart: {
                type: 'bubble',
                height: 370,
				toolbar: {
					show: false
				}
            },
            colors: [
                '#757DFF', '#5DA8FF', '#BF85FB', '#1E8308', '#FE7A36', '#174EDE'
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                strokeDashArray: 7,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                min: 0,
                max: 1000,
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: true,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            // tooltip: {
            //     y: {
            //         formatter: function(val) {
            //             return "$" + val + "k";
            //         }
            //     }
            // }
        };
        var chart = new ApexCharts(document.querySelector("#marketingPerformanceOverviewChart"), options);
        chart.render();
    }

    // All NFT Slides
    const allNFTSlides = document.getElementById("allNFTSlides");
    if (allNFTSlides) {
        var swiper = new Swiper(".mySwiper3", {
            spaceBetween: 15,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: ".nft-swiper-button-next",
                prevEl: ".nft-swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                1024: {
                    slidesPerView: 4
                }
            }
        });
    }

    // Featured NFT Artworks Slides
    const featuredNftArtworksSlides = document.getElementById("featuredNftArtworksSlides");
    if (featuredNftArtworksSlides) {
        var swiper = new Swiper(".mySwiper2", {
            spaceBetween: 25,
            loop: true,
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                1024: {
                    slidesPerView: 3
                }
            }
        });
    }

    // Top Collections Slides
    const topCollectionsSlides = document.getElementById("topCollectionsSlides");
    if (topCollectionsSlides) {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            }
        });
    }

    // Active Auctions Countdown Timer
    const activeAuctionsTimerID = document.getElementById("active-auctions-timer");
    if (activeAuctionsTimerID) {
        function initializeCountdown(timerElement) {
            const duration = parseInt(timerElement.getAttribute("data-duration"), 10) * 1000; // Get duration in milliseconds
            let targetTime = Date.now() + duration; // Calculate the initial target time
    
            const hoursSection = timerElement.querySelector(".hours-span");
            const minutesSection = timerElement.querySelector(".minutes-span");
            const secondsSection = timerElement.querySelector(".seconds-span");
    
            function updateTimer() {
                const now = Date.now();
                const timeLeft = targetTime - now;
    
                if (timeLeft > 0) {
                const seconds = Math.floor((timeLeft / 1000) % 60);
                const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
                const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    
                // Update the timer display
                timerElement.querySelector(".hours").textContent = String(hours).padStart(2, '0');
                timerElement.querySelector(".minutes").textContent = String(minutes).padStart(2, '0');
                timerElement.querySelector(".seconds").textContent = String(seconds).padStart(2, '0');
    
                // Dynamically hide sections
                if (hours === 0) {
                    hoursSection.classList.add("hidden");
                } else {
                    hoursSection.classList.remove("hidden");
                }
    
                if (hours === 0 && minutes === 0) {
                    minutesSection.classList.add("hidden");
                } else {
                    minutesSection.classList.remove("hidden");
                }
    
                if (hours === 0 && minutes === 0 && seconds === 0) {
                    secondsSection.classList.add("hidden");
                } else {
                    secondsSection.classList.remove("hidden");
                }
                } else {
                    targetTime = Date.now() + duration; // Reset the timer
                    hoursSection.classList.remove("hidden");
                    minutesSection.classList.remove("hidden");
                    secondsSection.classList.remove("hidden");
                }
            }
            // Start the interval for this timer
            setInterval(updateTimer, 1000);
            updateTimer(); // Update immediately on page load
        }
        // Initialize all timers
        const timers = document.querySelectorAll(".active-auctions-timer");
        timers.forEach(timer => initializeCountdown(timer));
    }

    // NFT Ethereum Rate Chart
    const nftEthereumRateChart = document.getElementById("nftEthereumRateChart");
    if (nftEthereumRateChart) {
        var options = {
            series: [
				{
					name: "Ethereum Rate",
					data: [20, 40, 60, 60, 50, 30, 40, 30, 40, 40, 60, 60]
				}
			],
			chart: {
				type: "area",
				height: 246,
				zoom: {
					enabled: false
				},
				toolbar: {
					show: false
				}
			},
			colors: [
				"#3584FC"
			],
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: "stepline", //curve: ['straight', 'smooth', 'monotoneCubic', 'stepline']
				width: 3,
				lineCap: "10"
			},
			grid: {
				borderColor: '#ECF0FF', 
				strokeDashArray: 10,
				xaxis: {
					lines: {
						show: false
					}
				}
			},
			fill: {
				type: 'gradient',
				gradient: {
					stops: [0, 90, 100],
					shadeIntensity: 1,
					opacityFrom: 0,
					opacityTo: 0.8
				}
			},
			xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
			},
			yaxis: {
                tickAmount: 4,
                show: false,
                max: 80,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
			},
			legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
			}
        };
        var chart = new ApexCharts(document.querySelector("#nftEthereumRateChart"), options);
        chart.render();
    }

    // SaaS Todays Payment Chart
    const saasTodaysPaymentChart = document.getElementById("saasTodaysPaymentChart");
    if (saasTodaysPaymentChart) {
        var options = {
            series: [
                {
                    name: "Payment",
                    data: [40, 50, 80, 50, 40, 30, 40, 50, 60, 70, 50, 65]
                }
            ],
            chart: {
                type: "area",
                height: 320,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#ffffff"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2, 0],
                dashArray: [0, 6, 0]
            },
            grid: {
                show: true,
                borderColor: "#ffffff1a"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.2
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ffffff1a'
                },
                axisBorder: {
                    show: false,
                    color: '#ffffff1a'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ffffff1a'
                },
                axisTicks: {
                    show: false,
                    color: '#ffffff1a'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "k";
                    }
                },
                marker: {
                    show: true,
                    fillColors: ['#BE84F9']
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#saasTodaysPaymentChart"), options);
        chart.render();
    }

    // SaaS Active Users Chart
    const saasActiveUsersChart = document.getElementById("saasActiveUsersChart");
    if (saasActiveUsersChart) {
        var options = {
            series: [
                {
                    name: "Users",
                    data: [25, 18, 42, 83, 38, 65, 20, 42, 18, 25]
                }
            ],
            chart: {
                type: "bar",
                height: 320,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF"
            ],
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    columnWidth: "12px"
                }
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    "Oct 01",
                    "Oct 02",
                    "Oct 03",
                    "Oct 04",
                    "Oct 05",
                    "Oct 06",
                    "Oct 07",
                    "Oct 08",
                    "Oct 09",
                    "Oct 10"
                ],
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: true,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return val + 'K'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "k";
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#saasActiveUsersChart"), options);
        chart.render();
    }

    // SaaS Gross Revenue Chart
    const saasGrossRevenueChart = document.getElementById("saasGrossRevenueChart");
    if (saasGrossRevenueChart) {
        var options = {
            series: [
                {
                    name: "October",
                    data: [108, 130, 110, 140, 130, 115, 125, 115, 125, 140]
                },
                {
                    name: "September",
                    data: [135, 115, 128, 120, 125, 130, 135, 130, 135, 145]
                }
            ],
            chart: {
                type: "line",
                height: 350,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#757DFF", "#E9D5FF"
            ],
            stroke: {
                width: 4,
                curve: "straight",
                dashArray: [0, 8]
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    "Oct 01",
                    "Oct 02",
                    "Oct 03",
                    "Oct 04",
                    "Oct 05",
                    "Oct 06",
                    "Oct 07",
                    "Oct 08",
                    "Oct 09",
                    "Oct 10"
                ],
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 150,
                min: 100,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "k";
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#saasGrossRevenueChart"), options);
        chart.render();
    }

    // SaaS Product Trade Condition Chart
    const saasProductTradeCondition = document.getElementById("saasProductTradeCondition");
    if (saasProductTradeCondition) {
        var options = {
            series: [
                {
                    name: "Price",
                    data: [
                        {
                            x: new Date(1538778600000),
                            y: [6629.81, 6650.5, 6623.04, 6633.33]
                        },
                        {
                            x: new Date(1538780400000),
                            y: [6632.01, 6643.59, 6620, 6630.11]
                        },
                        {
                            x: new Date(1538782200000),
                            y: [6630.71, 6648.95, 6623.34, 6635.65]
                        },
                        {
                            x: new Date(1538784000000),
                            y: [6635.65, 6651, 6629.67, 6638.24]
                        },
                        {
                            x: new Date(1538785800000),
                            y: [6638.24, 6640, 6620, 6624.47]
                        },
                        {
                            x: new Date(1538787600000),
                            y: [6624.53, 6636.03, 6621.68, 6624.31]
                        },
                        {
                            x: new Date(1538789400000),
                            y: [6624.61, 6632.2, 6617, 6626.02]
                        },
                        {
                            x: new Date(1538791200000),
                            y: [6627, 6627.62, 6584.22, 6603.02]
                        },
                        {
                            x: new Date(1538793000000),
                            y: [6605, 6608.03, 6598.95, 6604.01]
                        },
                        {
                            x: new Date(1538794800000),
                            y: [6604.5, 6614.4, 6602.26, 6608.02]
                        },
                        {
                            x: new Date(1538796600000),
                            y: [6608.02, 6610.68, 6601.99, 6608.91]
                        },
                        {
                            x: new Date(1538798400000),
                            y: [6608.91, 6618.99, 6608.01, 6612]
                        },
                        {
                            x: new Date(1538800200000),
                            y: [6612, 6615.13, 6605.09, 6612]
                        },
                        {
                            x: new Date(1538802000000),
                            y: [6612, 6624.12, 6608.43, 6622.95]
                        },
                        {
                            x: new Date(1538803800000),
                            y: [6623.91, 6623.91, 6615, 6615.67]
                        },
                        {
                            x: new Date(1538805600000),
                            y: [6618.69, 6618.74, 6610, 6610.4]
                        },
                        {
                            x: new Date(1538807400000),
                            y: [6611, 6622.78, 6610.4, 6614.9]
                        },
                        {
                            x: new Date(1538809200000),
                            y: [6614.9, 6626.2, 6613.33, 6623.45]
                        },
                        {
                            x: new Date(1538811000000),
                            y: [6623.48, 6627, 6618.38, 6620.35]
                        },
                        {
                            x: new Date(1538812800000),
                            y: [6619.43, 6620.35, 6610.05, 6615.53]
                        },
                        {
                            x: new Date(1538814600000),
                            y: [6615.53, 6617.93, 6610, 6615.19]
                        },
                        {
                            x: new Date(1538816400000),
                            y: [6615.19, 6621.6, 6608.2, 6620]
                        },
                        {
                            x: new Date(1538818200000),
                            y: [6619.54, 6625.17, 6614.15, 6620]
                        },
                        {
                            x: new Date(1538820000000),
                            y: [6620.33, 6634.15, 6617.24, 6624.61]
                        },
                        {
                            x: new Date(1538821800000),
                            y: [6625.95, 6626, 6611.66, 6617.58]
                        },
                        {
                            x: new Date(1538823600000),
                            y: [6619, 6625.97, 6595.27, 6598.86]
                        },
                        {
                            x: new Date(1538825400000),
                            y: [6598.86, 6598.88, 6570, 6587.16]
                        },
                        {
                            x: new Date(1538827200000),
                            y: [6588.86, 6600, 6580, 6593.4]
                        },
                        {
                            x: new Date(1538829000000),
                            y: [6593.99, 6598.89, 6585, 6587.81]
                        },
                        {
                            x: new Date(1538830800000),
                            y: [6587.81, 6592.73, 6567.14, 6578]
                        },
                        {
                            x: new Date(1538832600000),
                            y: [6578.35, 6581.72, 6567.39, 6579]
                        },
                        {
                            x: new Date(1538834400000),
                            y: [6579.38, 6580.92, 6566.77, 6575.96]
                        },
                        {
                            x: new Date(1538836200000),
                            y: [6575.96, 6589, 6571.77, 6588.92]
                        },
                        {
                            x: new Date(1538838000000),
                            y: [6588.92, 6594, 6577.55, 6589.22]
                        },
                        {
                            x: new Date(1538839800000),
                            y: [6589.3, 6598.89, 6589.1, 6596.08]
                        },
                        {
                            x: new Date(1538841600000),
                            y: [6597.5, 6600, 6588.39, 6596.25]
                        },
                        {
                            x: new Date(1538843400000),
                            y: [6598.03, 6600, 6588.73, 6595.97]
                        },
                        {
                            x: new Date(1538845200000),
                            y: [6595.97, 6602.01, 6588.17, 6602]
                        },
                        {
                            x: new Date(1538847000000),
                            y: [6602, 6607, 6596.51, 6599.95]
                        },
                        {
                            x: new Date(1538848800000),
                            y: [6600.63, 6601.21, 6590.39, 6591.02]
                        },
                        {
                            x: new Date(1538850600000),
                            y: [6591.02, 6603.08, 6591, 6591]
                        }
                    ]
                }
            ],
            chart: {
                type: "candlestick",
                height: 309,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#5DA8FF',
                        downward: '#FE7A36'
                    },
                    wick: {
                        useFillColor: true
                    }
                }
            },
            xaxis: {
                type: "datetime",
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                opposite: true,
                tickAmount: 6,
                tooltip: {
                    enabled: true
                },
                labels: {
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            }
        };
        var chart = new ApexCharts(document.querySelector("#saasProductTradeCondition"), options);
        chart.render();
    }

    // SaaS Active User Chart
    const saasTotalUsersChart = document.getElementById("saasTotalUsersChart");
    if (saasTotalUsersChart) {
        var options = {
            series: [60, 40, 50],
            chart: {
                height: 85,
                type: "donut"
            },
            labels: [
                "Online User", "Offline User", "None"
            ],
            colors: [
                "#757DFF", "#58F229", "#5DA8FF"
            ],
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            dataLabels: {
                enabled: false
            }
        };
        var chart = new ApexCharts(document.querySelector("#saasTotalUsersChart"), options);
        chart.render();
    }

    // SaaS Revenue Chart
    const saasRevenueChart = document.getElementById("saasRevenueChart");
    if (saasRevenueChart) {
        var options = {
            series: [
                {
                    name: "Revenue",
                    data: [35, 70, 35, 65, 45, 98, 80]
                }
            ],
            chart: {
                type: "area",
                height: 130,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            colors: [
                "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false,
                max: 100,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "k";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#saasRevenueChart"), options);
        chart.render();
    }

    // SaaS Conversion Chart
    const saasConversionChart = document.getElementById("saasConversionChart");
    if (saasConversionChart) {
        var options = {
			series: [
				{
					name: "Up",
					data: [70, 42, 70, 120, 40, 70]
				},
				{
					name: "Down",
					data: [-70, -44, -70, -120, -40, -70]
				}
			],
			chart: {
				type: 'bar',
				height: 130,
				stacked: true,
				toolbar: {
					show: false
				}
			},
			colors: [
                '#BF85FB', '#5DA8FF'
            ],
			plotOptions: {
				bar: {
					borderRadius: 2,
					columnWidth: '4px',
					borderRadiusApplication: "end",
					borderRadiusWhenStacked: "all"
				}
			},
			dataLabels: {
				enabled: false,
			},
			grid: {
                strokeDashArray: 7,
                borderColor: "#ECEEF2",
				xaxis: {
					lines: {
						show: false
					}
				},
				yaxis: {
					lines: {
						show: false
					}
				}
			},
			legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
			},
			xaxis: {
				categories: [
					"Sun",
					"Mon",
					"Tue",
					"Wed",
					"Thu",
					"Fri"
				],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
			},
			yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
			},
            tooltip: {
                y: {
                    formatter: function (value) {
                        return `${Math.abs(value).toFixed(2)}%`;  // Ensure that negative values appear as positive in the tooltip
                    }
                }
            }
		};
        var chart = new ApexCharts(document.querySelector("#saasConversionChart"), options);
        chart.render();
    }

    // Price Range Slider
    const priceRangeSliderID = document.getElementById("priceRangeSlider");
    if (priceRangeSliderID) {
        (function() {
            var parent = document.querySelector("#rangeSlider");
            if(!parent) return;
            var
            rangeS = parent.querySelectorAll("input[type=range]"),
                numberS = parent.querySelectorAll("input[type=number]");
            rangeS.forEach(function(el) {
                el.oninput = function() {
                    var slide1 = parseFloat(rangeS[0].value),
                        slide2 = parseFloat(rangeS[1].value);
                    if (slide1 > slide2) {
                        [slide1, slide2] = [slide2, slide1];
                    }
                    numberS[0].value = slide1;
                    numberS[1].value = slide2;
                }
            });
            numberS.forEach(function(el) {
                el.oninput = function() {
                    var number1 = parseFloat(numberS[0].value),
                        number2 = parseFloat(numberS[1].value);
                    if (number1 > number2) {
                        var tmp = number1;
                        numberS[0].value = number2;
                        numberS[1].value = tmp;
                    }
                    rangeS[0].value = number1;
                    rangeS[1].value = number2;
                }
            });
        })();
    }

    // Price Range Slider2
    const priceRangeSlider2ID = document.getElementById("priceRangeSlider2");
    if (priceRangeSlider2ID) {
        (function() {
            var parent = document.querySelector("#rangeSlider2");
            if(!parent) return;
            var
            rangeS = parent.querySelectorAll("input[type=range]"),
                numberS = parent.querySelectorAll("input[type=number]");
            rangeS.forEach(function(el) {
                el.oninput = function() {
                    var slide1 = parseFloat(rangeS[0].value),
                        slide2 = parseFloat(rangeS[1].value);
                    if (slide1 > slide2) {
                        [slide1, slide2] = [slide2, slide1];
                    }
                    numberS[0].value = slide1;
                    numberS[1].value = slide2;
                }
            });
            numberS.forEach(function(el) {
                el.oninput = function() {
                    var number1 = parseFloat(numberS[0].value),
                        number2 = parseFloat(numberS[1].value);
                    if (number1 > number2) {
                        var tmp = number1;
                        numberS[0].value = number2;
                        numberS[1].value = tmp;
                    }
                    rangeS[0].value = number1;
                    rangeS[1].value = number2;
                }
            });
        })();
    }

    // NFT Details Image Slides
    const nftDetailsImageSlides = document.getElementById("nftDetailsImageSlides");
    if (nftDetailsImageSlides) {
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            freeMode: true,
            spaceBetween: 15,
            slidesPerView: 4,
            watchSlidesProgress: true
        });
        var swiper2 = new Swiper(".mySwiper2", {
            loop: true,
            thumbs: {
                swiper: swiper
            }
        });
    }

    // Dish Details Image Slides
    const dishDetailsImageSlides = document.getElementById("dishDetailsImageSlides");
    if (dishDetailsImageSlides) {
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            freeMode: true,
            spaceBetween: 15,
            slidesPerView: 4,
            watchSlidesProgress: true
        });
        var swiper2 = new Swiper(".mySwiper2", {
            loop: true,
            thumbs: {
                swiper: swiper
            }
        });
    }

    // Room Details Image Slides
    const roomDetailsImageSlides = document.getElementById("roomDetailsImageSlides");
    if (roomDetailsImageSlides) {
        var swiper = new Swiper(".mySwiper", {
            loop: true,
            freeMode: true,
            spaceBetween: 15,
            slidesPerView: 4,
            watchSlidesProgress: true
        });
        var swiper2 = new Swiper(".mySwiper2", {
            loop: true,
            thumbs: {
                swiper: swiper
            }
        });
    }

    // Dashboard Show More
    const dashboardItemsList = document.getElementById("dashboardItemsList");
    if (dashboardItemsList) {
        // Select the button and the list items
        const toggleButton = document.getElementById('showMoreToggleButton');
        const hiddenItems = document.querySelectorAll('.itemHidden');
        const icon = toggleButton.querySelector('.plusMinusIcon');
        const buttonText = toggleButton.querySelector('.moreLessText');

        // Add a click event listener to the button
        toggleButton.addEventListener('click', function () {
            // Check if the items are currently hidden
            const areHidden = hiddenItems[0].style.display === 'none' || hiddenItems[0].style.display === '';

            // Toggle the visibility of the hidden items
            hiddenItems.forEach(item => {
                item.style.display = areHidden ? 'block' : 'none';
            });

            // Update the button text and icon
            if (areHidden) {
                buttonText.textContent = 'Show Less';
                icon.className = 'plusMinusIcon ri-indeterminate-circle-fill absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 mt-px'; // Change icon to minus
            } else {
                buttonText.textContent = 'Show More';
                icon.className = 'plusMinusIcon ri-add-circle-fill absolute ltr:right-0 rtl:left-0 top-1/2 -translate-y-1/2 mt-px'; // Change icon to plus
            }
        });

        // Initialize: Hide the items by default
        hiddenItems.forEach(item => (item.style.display = 'none'));
    }

    // Real Estate Rental Income Chart
    const realEstateRentalHomeChart = document.getElementById("realEstateRentalHomeChart");
    if (realEstateRentalHomeChart) {
        var options = {
            series: [
                {
                    name: "Income",
                    data: [430, 500, 400, 650, 230, 400, 180, 360, 750, 300, 230, 170]
                }
            ],
            chart: {
                type: "bar",
                height: 240,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "28px"
                }
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
			xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
			},
            yaxis: {
                tickAmount: 4,
                max: 800,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val;
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val;
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#realEstateRentalHomeChart"), options);
        chart.render();
    }

    // Real Estate Social Search Chart
    const realEstateSocialSearchChart = document.getElementById("realEstateSocialSearchChart");
    if (realEstateSocialSearchChart) {
        var options = {
            series: [35, 50, 60, 70],
            chart: {
                height: 260,
                type: 'radialBar'
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: '40%'
                    },
                    dataLabels: {
                        show: true,
                        name: {
                            offsetY: -10,
                            fontSize: '14px',
                            color: '#64748B',
                            fontWeight: '400'
                        },
                        value: {
                            show: true,
                            color: '#3A4252',
                            fontSize: '22px',
                            fontWeight: '600',
                            offsetY: 3
                        },
                        total: {
                            show: false,
                            fontSize: '14px',
                            color: '#64748B',
                            fontWeight: '400'
                        }
                    }
                }
            },
            labels: ['Facebook', 'Instagram', 'Linkedin', 'YouTube'],
            colors: ['#AD63F6', '#3584FC', '#37D80A', '#FD5812']
        };
        var chart = new ApexCharts(document.querySelector("#realEstateSocialSearchChart"), options);
        chart.render();
    }

    // Recent Properties Slides
    const recentPropertiesSlides = document.getElementById("recentPropertiesSlides");
    if (recentPropertiesSlides) {
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            }
        });
    }

    // Customer Reviews Slides
    const customerReviewsSlides = document.getElementById("customerReviewsSlides");
    if (customerReviewsSlides) {
        var swiper = new Swiper(".mySwiper2", {
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 1
                },
                1440: {
                    slidesPerView: 2
                }
            }
        });
    }

    // Real Estate Social Search Chart
    const realEstateRevenueChart = document.getElementById("realEstateRevenueChart");
    if (realEstateRevenueChart) {
        var options = {
			series: [
				{
					name: 'Income',
					data: [
						{
							x: '2019',
							y: 1292,
							goals: [
								{
                                    name: 'Expenses',
                                    value: 1400,
                                    strokeHeight: 5,
                                    strokeColor: '#FFCEA9'
								}
							]
						},
						{
							x: '2020',
							y: 4432,
							goals: [
								{
									name: 'Expenses',
									value: 5400,
									strokeHeight: 5,
									strokeColor: '#FFCEA9'
								}
							]
						},
						{
							x: '2021',
							y: 5423,
							goals: [
								{
                                    name: 'Expenses',
                                    value: 5200,
                                    strokeHeight: 5,
                                    strokeColor: '#FFCEA9'
								}
							]
						},
						{
							x: '2022',
							y: 6653,
							goals: [
								{
                                    name: 'Expenses',
                                    value: 6500,
                                    strokeHeight: 5,
                                    strokeColor: '#FFCEA9'
								}
							]
						},
						{
							x: '2023',
							y: 8133,
							goals: [
								{
                                    name: 'Expenses',
                                    value: 6600,
                                    strokeHeight: 13,
                                    strokeWidth: 0,
                                    strokeLineCap: 'round',
                                    strokeColor: '#FFCEA9'
								}
							]
						},
						{
							x: '2024',
							y: 7132,
							goals: [
								{
                                    name: 'Expenses',
                                    value: 7500,
                                    strokeHeight: 5,
                                    strokeColor: '#FFCEA9'
								}
							]
						},
						{
							x: '2025',
							y: 7332,
							goals: [
								{
                                    name: 'Expenses',
                                    value: 8700,
                                    strokeHeight: 5,
                                    strokeColor: '#FFCEA9'
								}
							]
						},
					]
				}
			],
			chart: {
				height: 135,
				type: 'bar',
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				bar: {
					columnWidth: '15.41px'
				}
			},
			colors: [
                '#FD5812'
            ],
			dataLabels: {
				enabled: false
			},
			legend: {
				show: true,
				showForSingleSeries: true,
				customLegendItems: ['Income', 'Expenses'],
				horizontalAlign: 'bottom',
				position: 'right',
				fontSize: '12px',
				offsetX: -17,
				offsetY: 52,
				itemMargin: {
					horizontal: 0,
					vertical: 4
				},
				labels: {
					colors: '#64748B'
				},
				markers: {
                    size: 5,
                    offsetX: -2,
                    offsetY: 2,
                    shape: 'square',
					fillColors: ['#FD5812', '#FFCEA9']
				}
			},
			xaxis: {
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
			},
            yaxis: {
                labels: {
                    show: false,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
			grid: {
				show: false,
                borderColor: "#ECEEF2"
			},
			tooltip: {
				y: {
					formatter: function(val) {
					    return "$" + val + "k";
					}
				}
			}
		};
        var chart = new ApexCharts(document.querySelector("#realEstateRevenueChart"), options);
        chart.render();
    }

    // Real Estate New Listings vs Sold Properties Chart
    const realEstateNewListingsSoldPropertiesChart = document.getElementById("realEstateNewListingsSoldPropertiesChart");
    if (realEstateNewListingsSoldPropertiesChart) {
        var options = {
            series: [
                {
                    name: "New Property",
                    data: [85, 55, 70, 98, 65, 38, 63, 45, 85, 55, 45, 48]
                },
                {
                    name: "Sold Property",
                    data: [35, 42, 60, 38, 16, 20, 25, 38, 37, 50, 35, 38]
                }
            ],
            chart: {
                type: "area",
                height: 319,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#37D80A", "#3584FC"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight",
                width: [2, 2],
                dashArray: [6, 6]
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: true,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: true,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#realEstateNewListingsSoldPropertiesChart"), options);
        chart.render();
    }

    // Real Estate Properties for Sale Chart
    const realEstatePropertiesForSaleChart = document.getElementById("realEstatePropertiesForSaleChart");
    if (realEstatePropertiesForSaleChart) {
        var options = {
			series: [
                75
            ],
			chart: {
				height: 155,
				type: "radialBar",
			},
			colors: [
                "#37D80A"
            ],
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 0,
						margin: 10,
						size: "45%",
						background: "#F5F7F8"
					},
					track: {
						background: "#F5F7F8"
					},
					dataLabels: {
						name: {
							show: false,
							offsetY: -10,
							color: "#4b9bfa",
							fontSize: ".625rem"
						},
						value: {
							offsetY: 5,
							show: true,
							fontWeight: 700,
							color: "#3A4252",
							fontSize: "14px"
						}
					}
				}
			},
			stroke: {
				lineCap: "0"
			},
			labels: ["Status"]
		};
        var chart = new ApexCharts(document.querySelector("#realEstatePropertiesForSaleChart"), options);
        chart.render();
    }

    // Real Estate Properties for Rent Chart
    const realEstatePropertiesForRentChart = document.getElementById("realEstatePropertiesForRentChart");
    if (realEstatePropertiesForRentChart) {
        var options = {
			series: [
                35
            ],
			chart: {
				height: 155,
				type: "radialBar",
			},
			colors: [
                "#605DFF"
            ],
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 0,
						margin: 10,
						size: "45%",
						background: "#F5F7F8"
					},
					track: {
						background: "#F5F7F8"
					},
					dataLabels: {
						name: {
							show: false,
							offsetY: -10,
							color: "#4b9bfa",
							fontSize: ".625rem"
						},
						value: {
							offsetY: 5,
							show: true,
							fontWeight: 700,
							color: "#3A4252",
							fontSize: "14px"
						}
					}
				}
			},
			stroke: {
				lineCap: "0"
			},
			labels: ["Status"]
		};
        var chart = new ApexCharts(document.querySelector("#realEstatePropertiesForRentChart"), options);
        chart.render();
    }

    // Shipment Average Delivery Time Chart
    const shipmentAverageDeliveryTimeChart = document.getElementById("shipmentAverageDeliveryTimeChart");
    if (shipmentAverageDeliveryTimeChart) {
        const data = [70, 60, 80, 100, 70, 40, 80];
        const middleIndex = Math.floor(data.length / 2);
        var options = {
            series: [
                {
                    name: "Time",
                    data: data
                }
            ],
            chart: {
                type: "bar",
                height: 186,
                toolbar: {
                    show: false
                }
            },
            colors: data.map((_, index) =>
                index === middleIndex ? '#3584FC' : '#BDDCFF'
            ),
            plotOptions: {
                bar: {
                    columnWidth: "18.35px",
                    borderRadius: 0,
                    distributed: true,
                    horizontal: false
                }
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#EEF1FF"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                tickAmount: 5,
                labels: {
                    formatter: (val) => {
                        return val + ' minutes'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + ' minutes'
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#shipmentAverageDeliveryTimeChart"), options);
        chart.render();
    }

    // Shipment Top Shipping Methods Chart
    const shipmentTopShippingMethodsChart = document.getElementById("shipmentTopShippingMethodsChart");
    if (shipmentTopShippingMethodsChart) {
        var options = {
			series: [
				45, 30, 15, 10
			],
			chart: {
				height: 180,
				type: "pie",
			},
			labels: [
				"Air", "Road", "Sea", "Rail"
			],
			colors: [
				"#3584FC", "#FD5812", "#605DFF", "#37D80A"
			],
			dataLabels: {
				enabled: true,
				style: {
					fontSize: '11px'
				},
				dropShadow: {
					enabled: false
				}
			},
			plotOptions: {
				pie: {
					expandOnClick: false
				}
			},
			stroke: {
				width: 1,
				show: true,
				colors: ["#ffffff"]
			},
			legend: {
                show: true,
				position: 'right',
                fontSize: '12px',
				horizontalAlign: 'bottom',
				offsetX: 0,
				offsetY: -15,
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: .5,
                    shape: 'square'
                }
			},
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + '%'
                    }
                }
            }
		};
        var chart = new ApexCharts(document.querySelector("#shipmentTopShippingMethodsChart"), options);
        chart.render();
    }

    // Shipment Todays Shipments Chart
    const shipmentTodaysShipmentsChart = document.getElementById("shipmentTodaysShipmentsChart");
    if (shipmentTodaysShipmentsChart) {
        var options = {
			series: [{
				name: "Shipment",
				data: [10, 31, 25, 40, 50, 50, 100]
			}],
			chart: {
				height: 187,
				type: 'line',
				zoom: {
					enabled: false
				},
				toolbar: {
					show: false
				}
			},
			colors: [
                '#5C61F2'
            ],
			dataLabels: {
				enabled: false
			},
			stroke: {
				curve: 'straight',
				width: 2,
			},
			grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#EEF1FF"
			},
			xaxis: {
				categories: [
					"3am",
					"6am",
					"9am",
					"12pm",
					"3pm",
					"6pm",
					"9pm",
					"12am",
				],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
			},
			yaxis: {
				tickAmount: 3,
                max: 150,
				min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
			},
			tooltip: {
				y: {
					formatter: (val) => {
						return val + ' Ton'
					},
				}
			}
		};
        var chart = new ApexCharts(document.querySelector("#shipmentTodaysShipmentsChart"), options);
        chart.render();
    }

    // Shipment On-Time Delivery Chart
    const shipmentOnTimeDeliveryChart = document.getElementById("shipmentOnTimeDeliveryChart");
    if (shipmentOnTimeDeliveryChart) {
        var options = {
            series: [
                85, 15
            ],
            chart: {
                type: 'pie',
                height: 182
            },
            labels: [
                'Delivered', 'Canceled'
            ],
            colors: [
                '#37D80A', '#FF4023'
            ],
            legend: {
                show: false
            },
            dataLabels: {
				enabled: true,
				style: {
					fontSize: '11px'
				},
				dropShadow: {
					enabled: false
				}
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + '%'
                    }
                }
            },
			legend: {
                show: true,
				position: 'left',
                fontSize: '12px',
				horizontalAlign: 'bottom',
				offsetX: -25,
				offsetY: 0,
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: .5,
                    shape: 'square'
                }
			}
        };
        var chart = new ApexCharts(document.querySelector("#shipmentOnTimeDeliveryChart"), options);
        chart.render();
    }

    // Shipment Live Shipment Status Chart
    const shipmentLiveShipmentStatusChart = document.getElementById("shipmentLiveShipmentStatusChart");
    if (shipmentLiveShipmentStatusChart) {
        var options = {
			series: [
				{
					name: "In Transit",
					data: [70, 60, 40, 40, 35, 30, 40]
				},
				{
					name: "Delivered",
					data: [30, 45, 50, 55, 60, 70, 65]
				},
				{
					name: "Delayed",
					data: [15, 20, 25, 30, 25, 20, 15]
				},
				{
					name: "Canceled",
					data: [5, 10, 15, 20, 15, 10, 5]
				}
			],
			chart: {
				height: 180,
				type: "line",
				zoom: {
					enabled: false
				},
				toolbar: {
					show: false
				}
			},
			dataLabels: {
				enabled: false
			},
			colors: [
				"#3584FC", "#37D80A", "#FD5812", "#EE3E08"
			],
			stroke: {
				curve: "straight",
				width: 2
			},
			grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#EEF1FF"
			},
			markers: {
				size: 3,
				strokeWidth: 0,
				shape: ["circle", "circle"],
				strokeDashArray: 0,
				strokeWidth: 2,
				hover: {
					size: 4
				}
			},
			xaxis: {
				categories: [
					"D1",
					"D2",
					"D3",
					"D4",
					"D5",
					"D6",
					"D7"
				],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
			},
			yaxis: {
				tickAmount: 4,
                max: 80,
				min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
			},
			legend: {
                show: true,
                position: 'left',
                fontSize: '12px',
                horizontalAlign: 'bottom',
				offsetX: -26,
				offsetY: 0,
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: .5,
                    shape: 'square'
                }
			}
		};
        var chart = new ApexCharts(document.querySelector("#shipmentLiveShipmentStatusChart"), options);
        chart.render();
    }

    // Shipment Delivered Chart
    const shipmentDeliveredChart = document.getElementById("shipmentDeliveredChart");
    if (shipmentDeliveredChart) {
        var options = {
            series: [
                {
                    name: "Car Box",
                    type: "column",
                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
                },
                {
                    name: "Truck Cargo",
                    type: "area",
                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
                },
                {
                    name: "Ship Cargo",
                    type: "line",
                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
                }
            ],
            chart: {
                height: 292,
                type: "line",
                stacked: false,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF", "#FD5812", "#37D80A"
            ],
            stroke: {
                width: [0, 1, 5],
                curve: "smooth"
            },
            plotOptions: {
                bar: {
                    columnWidth: "18.14px"
                }
            },
            fill: {
                opacity: [1, 0.08, 1]
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                axisTicks: {
                    show: true,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: true,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 80,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return val + '%';
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function(y) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(0) + "%";
                        }
                        return y;
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            grid: {
                show: true,
                strokeDashArray: 5,
                borderColor: "#EEF1FF"
            }
        };
        var chart = new ApexCharts(document.querySelector("#shipmentDeliveredChart"), options);
        chart.render();
    }

    // Finance Statistics Chart
    const financeStatisticsChart = document.getElementById("financeStatisticsChart");
    if (financeStatisticsChart) {
        var options = {
            series: [
                {
                    name: "Income",
                    data: [450, 540, 560, 540, 600, 570, 630, 600, 660]
                },
                {
                    name: "Expenses",
                    data: [760, 850, 1000, 970, 850, 1050, 900, 1130, 950]
                }
            ],
            chart: {
                type: "bar",
                height: 402,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#9CAAFF", "#605DFF"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "19.96px"
                }
            },
            grid: {
                show: true,
                borderColor: "#F6F7F9"
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 4,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep"
                ],
                axisTicks: {
                    show: true,
                    color: '#F6F7F9'
                },
                axisBorder: {
                    show: false,
                    color: '#F6F7F9'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 6,
                max: 1200,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val;
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#F6F7F9'
                },
                axisTicks: {
                    show: false,
                    color: '#F6F7F9'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val;
                    }
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#financeStatisticsChart"), options);
        chart.render();
    }

    // Finance Weekly Expenses Chart
    const financeWeeklyExpensesChart = document.getElementById("financeWeeklyExpensesChart");
    if (financeWeeklyExpensesChart) {
        var options = {
            series: [
                {
                    name: "Expenses",
                    data: [20, 100, 150, 100, 220, 180, 300]
                }
            ],
            chart: {
                type: "area",
                height: 160,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3584FC"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.5
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                borderColor: "#F6F7F9"
            },
            stroke: {
                curve: "smooth",
                width: 2
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: true,
                    color: '#F6F7F9'
                },
                axisBorder: {
                    show: true,
                    color: '#F6F7F9'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 3,
                max: 300,
                min: 0,
                opposite: true,
                labels: {
                    formatter: (val) => {
                        return '$' + val;
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#F6F7F9'
                },
                axisTicks: {
                    show: false,
                    color: '#F6F7F9'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val;
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#financeWeeklyExpensesChart"), options);
        chart.render();
    }

    // Finance Cash at End of the Month Chart
    const financeCashEndOfTheMonthChart = document.getElementById("financeCashEndOfTheMonthChart");
    if (financeCashEndOfTheMonthChart) {
        var options = {
            series: [
                42.9, 20.0, 37.1
            ],
            chart: {
                type: 'donut',
                height: 245
            },
            labels: [
                'Cash Inflows', 'Cash Outflows', 'Remaining Cash'
            ],
            colors: [
                '#37D80A', '#FD5812', '#605DFF'
            ],
            legend: {
                show: false
            },
            stroke: {
                width: 0
            },
            plotOptions: {
                pie: {
                    endAngle: 90,
                    startAngle: -90,
                    expandOnClick: false,
                    donut: {
                        size: '65%'
                    },
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px'
                },
                dropShadow: {
                    enabled: false
                },
                formatter: function (val) {
                    return val.toFixed(1) + '%';
                },
                offset: 0,
                textAnchor: 'middle'
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'center',
                offsetX: 0,
                offsetY: -95,
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#financeCashEndOfTheMonthChart"), options);
        chart.render();
    }

    // Finance Income Sources Chart
    const financeIncomeSourcesChart = document.getElementById("financeIncomeSourcesChart");
    if (financeIncomeSourcesChart) {
        var options = {
            series: [
                42, 47, 52, 58
            ],
            chart: {
                width: 340,
                type: 'polarArea'
            },
            labels: [
                '$95k', '$60k', '$45k', '$22k'
            ],
            fill: {
                opacity: 1
            },
            stroke: {
                width: 0
            },
            tooltip: {
                enabled: true,
                custom: function ({ series, seriesIndex, w }) {
                    // Custom tooltip with detailed information like legend
                    let category = w.globals.labels[seriesIndex];
                    let value = series[seriesIndex];
                    let percentage = (value / w.globals.series.reduce((a, b) => a + b) * 100).toFixed(2);
                    return `<div style="padding: 10px; font-size: 13px; color: #333333; background: #ffffff; border-radius: 5px; box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);">
                        <strong>${category}</strong><br/>
                        Value: $${value}K<br/>
                        Contribution: ${percentage}%
                    </div>`;
                }
            },
            legend: {
                show: true,
				position: 'left',
                fontSize: '12px',
				horizontalAlign: 'bottom',
				offsetX: -24,
				offsetY: 15,
                customLegendItems: ['Product Sales', 'Investments', 'Salary', 'Consulting'],
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                },
                labels: {
                    colors: '#ECEEF2'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: .5,
                    shape: 'square'
                }
            },
            plotOptions: {
                polarArea: {
                    rings: {
                        strokeWidth: 0
                    },
                    spokes: {
                        strokeWidth: 0
                    }
                }
            },
            theme: {
                monochrome: {
                    enabled: true,
                    shadeTo: 'light',
                    shadeIntensity: 0.6
                }
            },
            dataLabels: {
                enabled: false,
                style: {
                    fontSize: '11px'
                },
                dropShadow: {
                    enabled: false
                },
                formatter: function (val, opts) {
                    return opts.w.globals.labels[opts.seriesIndex];
                },
                background: {
                    padding: 5,
                    opacity: 1,
                    foreColor: '#ffffff',
                    borderWidth: 0
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#financeIncomeSourcesChart"), options);
        chart.render();
    }

    // Finance Net Profit Chart
    const financeNetProfitChart = document.getElementById("financeNetProfitChart");
    if (financeNetProfitChart) {
        var options = {
			series: [
				{
					name: "Net Profit",
					data: [130, 200, 160, 80, 70, 120, 140]
				}
			],
			chart: {
				type: "bar",
				height: 200,
				toolbar: {
					show: false
				}
			},
			colors: [
				"#37D80A"
			],
			plotOptions: {
				bar: {
					columnWidth: "15px",
					colors: {
						backgroundBarColors: ["#37D80A"],
						backgroundBarOpacity: 0.2
					}
				}
			},
            grid: {
                show: true,
                borderColor: "#F6F7F9"
            },
			dataLabels: {
				enabled: false
			},
			xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: true,
                    color: '#F6F7F9'
                },
                axisBorder: {
                    show: true,
                    color: '#F6F7F9'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
			},
			yaxis: {
				tickAmount: 4,
				max: 200,
				min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val;
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#F6F7F9'
                },
                axisTicks: {
                    show: false,
                    color: '#F6F7F9'
                }
			},
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            },
			legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
			}
		};
        var chart = new ApexCharts(document.querySelector("#financeNetProfitChart"), options);
        chart.render();
    }

    // Finance Expense Breakdown Chart
    const financeExpenseBreakdownChart = document.getElementById("financeExpenseBreakdownChart");
    if (financeExpenseBreakdownChart) {
        var options = {
            chart: {
                type: 'pie',
                height: 230,
            },
            series: [
                30, 25, 20, 25
            ],
            labels: [
                'Sales', 'Salaries', 'Miscellaneous', 'Marketing'
            ],
            colors: [
                '#AD63F6', '#BF85FB', '#D7B5FD', '#E9D5FF'
            ],
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '12px'
                },
                dropShadow: {
                    enabled: false
                }
            },
            stroke: {
                width: 0,
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: function (val) {
                        return val + "%";
                    }
                }
            },
            plotOptions: {
                pie: {
                    dataLabels: {
                        offset: -5
                    },
                    expandOnClick: true
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#financeExpenseBreakdownChart"), options);
        chart.render();
    }

    // POS System Sales Analytics Chart
    const posSystemSalesAnalyticsChart = document.getElementById("posSystemSalesAnalyticsChart");
    if (posSystemSalesAnalyticsChart) {
        const data = [70, 60, 80, 100, 70, 40, 80];
        const middleIndex = Math.floor(data.length / 2);
        var options = {
            series: [
                {
                    name: "Sale",
                    data: data
                }
            ],
            chart: {
                type: "bar",
                height: 200,
                toolbar: {
                    show: false
                }
            },
            colors: data.map((_, index) =>
                index === middleIndex ? '#605DFF' : '#C2CDFF'
            ),
            plotOptions: {
                bar: {
                    columnWidth: "13px",
                    borderRadius: 4,
                    distributed: true,
                    horizontal: false
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                // tickAmount: 5,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#posSystemSalesAnalyticsChart"), options);
        chart.render();
    }

    // POS System Top Performing Chart
    const posSystemTopPerformingChart = document.getElementById("posSystemTopPerformingChart");
    if (posSystemTopPerformingChart) {
        var options = {
            series: [
                35000, 25000, 18000
            ],
            chart: {
                type: 'donut',
                height: 155
            },
            labels: [
                'Electronics', 'Clothing', 'Home Goods'
            ],
            colors: [
                '#AD63F6', '#37D80A', '#3584FC'
            ],
            stroke: {
                width: 2
            },
            plotOptions: {
                pie: {
                    endAngle: 90,
                    startAngle: -90,
                    expandOnClick: false,
                    donut: {
                        size: '65%'
                    },
                }
            },
            dataLabels: {
                enabled: false,
                style: {
                    fontSize: '12px'
                },
                dropShadow: {
                    enabled: false
                },
                formatter: function (val) {
                    return '$' + val.toFixed(1);
                },
                offset: 0,
                textAnchor: 'middle'
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val;
                    }
                }
            },
            legend: {
                show: false,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'center',
                offsetX: 0,
                offsetY: -95,
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#posSystemTopPerformingChart"), options);
        chart.render();
    }

    // POS System Customer Segmentation Chart
    const posSystemCustomerSegmentationChart = document.getElementById("posSystemCustomerSegmentationChart");
    if (posSystemCustomerSegmentationChart) {
        var options = {
            series: [1200, 1800],
            chart: {
                height: 210,
                type: "donut"
            },
            labels: ['New', 'Returning'],
            colors: [
                '#AD63F6', '#37D80A', '#3584FC'
            ],
            colors: [
                "#3584FC", "#AD63F6"
            ],
            stroke: {
                width: 0,
                show: true,
                colors: ["#ffffff"]
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 7,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'diamond'
                }
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        size: '80%',
                        labels: {
                            show: true,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '24px',
                                fontWeight: '600'
                            },
                            total: {
                                show: true,
                                color: '#64748B'
                            }
                        }
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false
            }
        };
        var chart = new ApexCharts(document.querySelector("#posSystemCustomerSegmentationChart"), options);
        chart.render();
    }

    // Podcast Today's Earnings Chart
    const podcastTodaysEarningsChart = document.getElementById("podcastTodaysEarningsChart");
    if (podcastTodaysEarningsChart) {
        var options = {
            series: [{ name: "Earnings", data: [100, 130, 115, 170, 110, 120, 160, 100, 200, 105, 130, 100] }],
            chart: {
                type: "area",
                height: 150,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: 1
            },
            colors: [
                "#9135E8"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: [
                    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 5,
                show: false,
                // max: 220,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 7,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'diamond'
                }
            },
            tooltip: {
                enabled: true,
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#podcastTodaysEarningsChart"), options);
        chart.render();
    }

    // Podcast Listener Analytics Chart
    const podcastListenerAnalyticsChart = document.getElementById("podcastListenerAnalyticsChart");
    if (podcastListenerAnalyticsChart) {
        var options = {
            series: [
                {
                    name: "Men",
                    data: [50, 22, 25, 35, 20]
                },
                {
                    name: "Women",
                    data: [20, 30, 18, 42, 15]
                }
            ],
            chart: {
                type: "bar",
                height: 360,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#9747FF", "#9CAAFF"
            ],
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    columnWidth: "35%",
                    borderRadiusApplication: 'end'
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 5,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: [
                    "18-24", "25-34", "35-44", "45-54", "55-64"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // min: 0,
                // max: 60,
                tickAmount: 3,
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: (val) => {
                        return val + '%'
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 35
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            grid: {
                show: true,
                strokeDashArray: 10,
                borderColor: "#ECEEF2"
            }
        };
        var chart = new ApexCharts(document.querySelector("#podcastListenerAnalyticsChart"), options);
        chart.render();
    }
    const podcastListenerAnalyticsChart2 = document.getElementById("podcastListenerAnalyticsChart2");
    if (podcastListenerAnalyticsChart2) {
        var options = {
            series: [75, 25],
            chart: {
                height: 80,
                type: "donut"
            },
            labels: [
                "Men", "Woman"
            ],
            stroke: {
                width: 0,
                show: true,
                colors: ["#ffffff"]
            },
            colors: [
                "#AD63F6", "#3584FC"
            ],
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        size: '80%'
                    }
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'right',
                horizontalAlign: 'center',
                offsetX: -9,
                offsetY: -2,
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 5,
                    offsetX: -2,
                    offsetY: 1.5,
                    shape: 'circle'
                },
                customLegendItems: ['Men: 75%', 'Women: 25%'],
            }
        };
        var chart = new ApexCharts(document.querySelector("#podcastListenerAnalyticsChart2"), options);
        chart.render();
    }

    // Music Player
    const musicPlayer = document.getElementById("musicPlayer");
    if (musicPlayer) {
        (function() {
            let currentPlaying = null;
            document.querySelectorAll("[data-player]").forEach(player => {
                const audio = player.querySelector("audio");
                const playPauseBtn = player.querySelector(".playPauseBtn");
                const playPauseIcon = player.querySelector(".playPauseIcon");
                const restartBtn = player.querySelector(".restartBtn");
                const rewindBtn = player.querySelector(".rewindBtn");
                const fastForwardBtn = player.querySelector(".fastForwardBtn");
                const progressBar = player.querySelector(".progress-bar");
                const progressContainer = player.querySelector(".progress");
                const currentTimeDisplay = player.querySelector(".current-time");
                const durationDisplay = player.querySelector(".duration");
                function updateDuration() {
                    if (audio.duration && !isNaN(audio.duration)) {
                        durationDisplay.textContent = formatTime(audio.duration);
                    }
                }
                if (audio.readyState > 0) {
                    updateDuration();
                } else {
                    audio.addEventListener("loadedmetadata", updateDuration);
                }
                playPauseBtn.addEventListener("click", () => {
                    if (currentPlaying && currentPlaying !== audio) {
                        currentPlaying.pause();
                        currentPlaying.parentElement.querySelector(".playPauseIcon").textContent = "▶";
                        currentPlaying.parentElement.classList.remove("playing"); // Remove class if another audio is playing
                    }
                    if (audio.paused) {
                        audio.play();
                        playPauseIcon.textContent = "⏸";
                        currentPlaying = audio;
                        player.classList.add("playing"); // Add the 'playing' class when the audio is playing
                    } else {
                        audio.pause();
                        playPauseIcon.textContent = "▶";
                        currentPlaying = null;
                        player.classList.remove("playing"); // Remove the 'playing' class when the audio is paused
                    }
                });
                restartBtn.addEventListener("click", () => {
                    audio.currentTime = 0;
                    audio.play();
                    playPauseIcon.textContent = "⏸";
                    currentPlaying = audio;
                });
                rewindBtn.addEventListener("click", () => {
                    audio.currentTime = Math.max(0, audio.currentTime - 5);
                });
                fastForwardBtn.addEventListener("click", () => {
                    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
                });
                audio.addEventListener("timeupdate", () => {
                    const percentage = (audio.currentTime / audio.duration) * 100;
                    progressBar.style.width = percentage + "%";
                    currentTimeDisplay.textContent = formatTime(audio.currentTime);
                });
                progressContainer.addEventListener("click", (event) => {
                    const width = progressContainer.clientWidth;
                    const clickX = event.offsetX;
                    const duration = audio.duration;
                    audio.currentTime = (clickX / width) * duration;
                });
                function formatTime(seconds) {
                    const minutes = Math.floor(seconds / 60);
                    const secs = Math.floor(seconds % 60);
                    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
                }
            });
        })();
    }

    // Featured Slides
    const podcastFeaturedSlides = document.getElementById("podcastFeaturedSlides");
    if (podcastFeaturedSlides) {
        var swiper = new Swiper(".mySwiper", {
            margin: 25,
            slidesPerView: 1,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            }
        });
    }

    // Social Media LinkedIn Net Followers Chart
    const linkedinNetFollowersChart = document.getElementById("linkedinNetFollowersChart");
    if (linkedinNetFollowersChart) {
        var options = {
            series: [
                {
                    name: "Followers",
                    data: [250, 150, 250, 120, 350, 150, 250]
                }
            ],
            chart: {
                type: "area",
                height: 297,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                },
                dropShadow: {
                    top: 5,
                    left: 5,
                    blur: 3,
                    opacity: 0.6,
                    enabled: true,
                    color: "#605DFF",
                    enabledOnSeries: [0]
                }
            },
            colors: [
                "#605DFF"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [1]
            },
            grid: {
                borderColor: '#ECEEF2',
                strokeDashArray: 8
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.4,
                    opacityTo: 0.0
                }
            },
            xaxis: {
                categories: [
                    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
                ],
                axisTicks: {
                    show: false,
                    color: '#64748B'
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 400,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                axisTicks: {
                    show: false,
                    color: '#D5D9E2'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#linkedinNetFollowersChart"), options);
        chart.render();
    }

    // Social Media Followers by Gender Chart
    const followersByGenderChart = document.getElementById("followersByGenderChart");
    if (followersByGenderChart) {
        var options = {
            series: [55, 45],
            chart: {
                height: 205,
                type: "pie"
            },
            labels: [
                "Male Followers", "Female Followers"
            ],
            colors: [
                "#605DFF", "#AD63F6"
            ],
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            stroke: {
                width: 1
            }
        };
        var chart = new ApexCharts(document.querySelector("#followersByGenderChart"), options);
        chart.render();
    }

    // Social Media Facebook Campaign Overview Chart
    const facebookCampaignOverviewChart = document.getElementById("facebookCampaignOverviewChart");
    if (facebookCampaignOverviewChart) {
        var options = {
            series: [
                { name: "Impressions", type: "column", data: [400, 600, 200, 700, 480, 380, 600] },
                { name: "Clicks", type: "column", data: [500, 420, 520, 570, 300, 400, 180] },
                { name: "CTR", type: "column", data: [450, 400, 330, 300, 410, 530, 380] },
                { name: "Cost Per Conversion", type: "line", data: [480, 650, 500, 800, 550, 800, 900] }
            ],
            chart: {
                height: 297,
                type: "line",
                stacked: false,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF", "#37D80A", "#FD5812", "#BF85FB"
            ],
            stroke: {
                width: [5, 5, 5, 2],
                curve: "smooth",
                colors: ["transparent", "transparent", "transparent", "#BF85FB"]
            },
            plotOptions: {
                bar: {
                    columnWidth: "40%",
                    borderRadius: 3
                }
            },
            xaxis: {
                categories: [
                    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
                ],
                axisTicks: {
                    show: false,
                    color: '#64748B'
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 1000,
                min: 0,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    },
                    formatter: function(val) {
                        return "$" + val;
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#D5D9E2'
                },
                axisTicks: {
                    show: false,
                    color: '#D5D9E2'
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                y: {
                    formatter: function(y) {
                        if (typeof y !== "undefined") {
                            return y.toFixed(0);
                        }
                        return y;
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            grid: {
                show: true,
                borderColor: '#ECEEF2',
                strokeDashArray: 8
            }
        };
        var chart = new ApexCharts(document.querySelector("#facebookCampaignOverviewChart"), options);
        chart.render();
    }

    // Doctor Patient Retention Chart
    const doctorPatientRetentionChart = document.getElementById("doctorPatientRetentionChart");
    if (doctorPatientRetentionChart) {
        var options = {
            series: [
                { name: "Old Patient", data: [45, 52, 38, 24, 33, 26, 21] },
                { name: "New Patient", data: [35, 41, 62, 42, 13, 18, 29] }
            ],
            chart: {
                height: 330,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#26A0FC", "#26E7A6"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 5,
                curve: "straight",
                dashArray: [0, 8, 5]
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            },
            xaxis: {
                categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                axisTicks: {
                    show: true,
                    color: '#E0E0E0'
                },
                axisBorder: {
                    show: true,
                    color: '#E0E0E0'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 80,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#E0E0E0'
                },
                axisTicks: {
                    show: false,
                    color: '#E0E0E0'
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#doctorPatientRetentionChart"), options);
        chart.render();
    }

    // Doctor Patient Distribution Chart
    const doctorPatientDistributionChart = document.getElementById("doctorPatientDistributionChart");
    if (doctorPatientDistributionChart) {
        var options = {
            series: [
                50, 30, 20
            ],
            chart: {
                height: 304,
                type: "donut"
            },
            labels: [
                "Male", "Female", "Children"
            ],
            colors: [
                "#605DFF", "#58F229", "#5DA8FF"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 5,
                show: true,
                colors: ["#ffffff"]
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '28px',
                                fontWeight: '600'
                            },
                            total: {
                                show: true,
                                color: '#64748B'
                            }
                        }
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#doctorPatientDistributionChart"), options);
        chart.render();
    }

    // Doctor Income vs Expense Chart
    const doctorIncomeVsExpenseChart = document.getElementById("doctorIncomeVsExpenseChart");
    if (doctorIncomeVsExpenseChart) {
        var options = {
            series: [
                { name: 'Income', data: [70, 42, 70, 120, 40, 70, 90] },
                { name: 'Expense', data: [-70, -44, -70, -120, -40, -70, -120] }
            ],
            chart: {
                type: 'bar',
                height: 336,
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            colors: [
                '#4936F5', '#C2CDFF'
            ],
            plotOptions: {
                bar: {
                    borderRadius: 3,
                    columnWidth: '24px',
                    borderRadiusApplication: "end",
                    borderRadiusWhenStacked: "all"
                }
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                show: true,
                strokeDashArray: 7,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                categories: [
                    'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 5,
                // max: 50,
                // min: 0,
                labels: {
                    formatter: (val) => {
                        return val + 'K'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 15
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            // tooltip: {
            //     y: {
            //         formatter: function (value) {
            //             return Math.abs(value) + "k followers";  // Ensure that negative values appear as positive in the tooltip
            //         }
            //     }
            // }
        };
        var chart = new ApexCharts(document.querySelector("#doctorIncomeVsExpenseChart"), options);
        chart.render();
    }

    // Beauty Salon Customer Satisfaction Rate Chart
    const bsCustomerSatisfactionRateChart = document.getElementById("bsCustomerSatisfactionRateChart");
    if (bsCustomerSatisfactionRateChart) {
        var options = {
            series: [80, 20],
            chart: {
                height: 182,
                type: "pie"
            },
            labels: [
                "Positive", "Negative"
            ],
            colors: [
                "#9CAAFF", "#FFAA72"
            ],
            dataLabels: {
                enabled: false
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 2
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#bsCustomerSatisfactionRateChart"), options);
        chart.render();
    }

    // Top Selling Products Slides
    const topSellingProductsSlides = document.getElementById("topSellingProductsSlides");
    if (topSellingProductsSlides) {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 20,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                1024: {
                    slidesPerView: 3
                },
                1440: {
                    spaceBetween: 25,
                    slidesPerView: 4
                }
            }
        });
    }

    // Beauty Salon Revenue By Services Chart
    const revenueByServicesChart = document.getElementById("revenueByServicesChart");
    if (revenueByServicesChart) {
        var options = {
            series: [
                { name: "Facial", data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43] },
                { name: "Manicure", data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27] },
                { name: "Pedicure", data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14] },
                { name: "Hair Cut", data: [21, 7, 25, 13, 22, 8, 21, 7, 25, 13, 22, 8] }
            ],
            chart: {
                type: "bar",
                height: 339,
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#82FC5A", "#D7B5FD", "#90C7FF", "#9CAAFF"
            ],
            dataLabels: {
                style: {
                    colors: ['#343A46']
                }
            },
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    borderRadiusWhenStacked: 'last'
                }
            },
            fill: {
                opacity: 1
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 5,
                // max: 100,
                min: 0,
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 10,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#revenueByServicesChart"), options);
        chart.render();
    }

    // Store Analysis Sales By Category Chart
    const salesByCategoryChart = document.getElementById("salesByCategoryChart");
    if (salesByCategoryChart) {
        var options = {
            series: [
                {
                    name: "Electronics",
                    data: [20, 100, 70, 30, 50, 80, 70]
                },
                {
                    name: "Non-electronics",
                    data: [68, 80, 33, 80, 70, 40, 30]
                }
            ],
            chart: {
                height: 359,
                type: "radar",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: true
            },
            colors: [
                "#FC6829", "#757DFF"
            ],
            plotOptions: {
                radar: {
                    polygons: {
                        fill: {
                            colors: ["#f8f8f8", "#ffffff"]
                        }
                    }
                }
            },
            xaxis: {
                categories: [
                    "Sunday",
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday"
                ],
                labels: {
                    show: true,
                    style: {
                        colors: "#A8A8A8",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                show: false
            },
            legend: {
                show: true,
                offsetY: -10,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 10,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -4,
                    offsetY: -.5,
                    strokeWidth: 0,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesByCategoryChart"), options);
        chart.render();
    }

    // Store Analysis Sales By Gender Chart
    const salesByGenderChart = document.getElementById("salesByGenderChart");
    if (salesByGenderChart) {
        var options = {
            series: [70, 30],
            chart: {
                height: 132,
                type: "donut"
            },
            labels: [
                "Male", "Female"
            ],
            colors: [
                "#3584FC", "#AD63F6"
            ],
            dataLabels: {
                enabled: false
            },
            legend: {
                show: true,
                offsetX: 0,
                offsetY: 15,
                fontSize: '12px',
                position: 'right',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -4,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesByGenderChart"), options);
        chart.render();
    }

    // Store Analysis Sales This Month Chart
    const salesThisMonthChart = document.getElementById("salesThisMonthChart");
    if (salesThisMonthChart) {
        var options = {
            series: [
                {
                    name: "Sale",
                    data: [0, 41, 60, 65, 35, 62, 150]
                }
            ],
            chart: {
                height: 105,
                type: "line",
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            colors: [
                "#605DFF"
            ],
            stroke: {
                curve: "straight"
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            },
            xaxis: {
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat"
                ],
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 150,
                min: 0,
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -4,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "k";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#salesThisMonthChart"), options);
        chart.render();
    }

    // Store Analysis Gross Revenue Chart
    const storeAnalysisGrossRevenueChart = document.getElementById("storeAnalysisGrossRevenueChart");
    if (storeAnalysisGrossRevenueChart) {
        var options = {
            series: [
                { name: 'Sales Revenue', data: [108, 130, 110, 140, 130, 115, 125, 115, 125, 140, 140, 130] },
                { name: 'Sales Volume', data: [140, 120, 125, 130, 110, 145, 135, 110, 130, 120, 130, 145] },
                { name: 'Order Value', data: [125, 115, 128, 120, 125, 130, 135, 130, 135, 145, 120, 125] }
            ],
            chart: {
                type: "line",
                height: 349,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#757DFF", "#AD63F6", "#37D80A"
            ],
            stroke: {
                width: 3,
                curve: "straight",
                dashArray: [0, 8]
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 150,
                min: 100,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "k";
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#storeAnalysisGrossRevenueChart"), options);
        chart.render();
    }

    // Restaurant Order Summary Chart
    const restaurantOrderSummaryChart = document.getElementById("restaurantOrderSummaryChart");
    if (restaurantOrderSummaryChart) {
        var options = {
            series: [10, 30, 45],
            chart: {
                height: 322,
                type: "donut"
            },
            labels: [
                "Served", "Processing", "Cancelled"
            ],
            colors: [
                "#5DA8FF", "#FE7A36", "#BF85FB"
            ],
            stroke: {
                width: 5,
                show: true,
                colors: ["#ffffff"]
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: true,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '28px',
                                fontWeight: '600',
                                formatter: (val, opts) => {
                                    const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    const percentage = ((val / total) * 100).toFixed(1); // Calculate percentage
                                    return `${val}k (${percentage}%)`; // Show value in currency + percentage
                                }
                            },
                            total: {
                                show: true,
                                color: '#64748B',
                                formatter: (w) => {
                                    return `${w.globals.seriesTotals.reduce((a, b) => a + b, 0)}k`; // Show total in currency
                                }
                            }
                        }
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 2
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "k";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#restaurantOrderSummaryChart"), options);
        chart.render();
    }

    // Restaurant Revenue vs Expense Chart
    const restaurantRevenueVsExpenseChart = document.getElementById("restaurantRevenueVsExpenseChart");
    if (restaurantRevenueVsExpenseChart) {
        var options = {
            series: [
                { name: "Revenue", data: [5, 7, 8, 6, 9, 10, 7] },
                { name: "Expense", data: [4, 6, 7, 5, 8, 9, 6] }
            ],
            chart: {
                type: "bar",
                height: 336,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#FFAA72", "#90C7FF"
            ],
            plotOptions: {
                bar: {
                    borderRadius: 5,
                    horizontal: false,
                    columnWidth: "50%",
                    borderRadiusApplication: "end",
                    borderRadiusWhenStacked: "all"
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 5,
                show: true,
                colors: ["transparent"]
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            },
            xaxis: {
                categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                axisTicks: {
                    show: true,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: true,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 10,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#restaurantRevenueVsExpenseChart"), options);
        chart.render();
    }

    // Restaurant Total Orders Chart
    const restaurantTotalOrdersChart = document.getElementById("restaurantTotalOrdersChart");
    if (restaurantTotalOrdersChart) {
        var options = {
            series: [
                {
                    name: "Orders",
                    data: [8, 10, 7, 10, 9, 11, 10]
                }
            ],
            chart: {
                type: "area",
                height: 115,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3584FC"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#ECEEF2"
            },
            stroke: {
                curve: "smooth",
                width: 2
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                min: 6,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#restaurantTotalOrdersChart"), options);
        chart.render();
    }

    // Restaurant Pending Orders Chart
    const restaurantPendingOrdersChart = document.getElementById("restaurantPendingOrdersChart");
    if (restaurantPendingOrdersChart) {
        var options = {
            series: [
                {
                    name: "Orders",
                    data: [15, 11, 9, 10, 7, 7, 3]
                }
            ],
            chart: {
                type: "area",
                height: 115,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#868DFF"
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: false,
                borderColor: "#868DFF"
            },
            stroke: {
                curve: "straight",
                width: 2
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#restaurantPendingOrdersChart"), options);
        chart.render();
    }

    // Restaurant Revenue Chart
    const restaurantRevenueChart = document.getElementById("restaurantRevenueChart");
    if (restaurantRevenueChart) {
        var options = {
            series: [80, 20],
            chart: {
                height: 92,
                type: "donut"
            },
            labels: [
                "Revenue", "Revenue"
            ],
            colors: [
                "#58F229", "#D8FFC8"
            ],
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "M";
                    }
                }
            },
            stroke: {
                width: 0
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#restaurantRevenueChart"), options);
        chart.render();
    }

    // Restaurant Expense Chart
    const restaurantExpenseChart = document.getElementById("restaurantExpenseChart");
    if (restaurantExpenseChart) {
        var options = {
            series: [
                {
                    name: "Up",
                    data: [70, 42, 70, 120, 40, 70]
                },
                {
                    name: "Down",
                    data: [-70, -44, -70, -120, -40, -70]
                }
            ],
            chart: {
                type: 'bar',
                height: 150,
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            colors: [
                '#BF85FB', '#5DA8FF'
            ],
            plotOptions: {
                bar: {
                    borderRadius: 2,
                    columnWidth: '4px',
                    borderRadiusApplication: "end",
                    borderRadiusWhenStacked: "all"
                }
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                strokeDashArray: 7,
                borderColor: "#ECEEF2",
                xaxis: {
                    lines: {
                        show: false
                    }
                },
                yaxis: {
                    lines: {
                        show: false
                    }
                }
            },
            xaxis: {
                categories: [
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: false,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                show: false,
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: function (value) {
                        return `${Math.abs(value).toFixed(2)}%`;  // Ensure that negative values appear as positive in the tooltip
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#restaurantExpenseChart"), options);
        chart.render();
    }

    // Hotel Rooms Availability Chart
    const hotelRoomsAvailabilityChart = document.getElementById("hotelRoomsAvailabilityChart");
    if (hotelRoomsAvailabilityChart) {
        var options = {
            series: [72.5],
            chart: {
                height: 380,
                type: "radialBar"
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            offsetY: -10,
                            fontSize: "14px",
                            color: '#64748B',
                            fontWeight: "400"
                        },
                        value: {
                            fontSize: "36px",
                            color: '#3A4252',
                            fontWeight: "700",
                            formatter: function(val) {
                                return val + "%";
                            }
                        }
                    },
                    track: {
                        background: '#EEFFE5'
                    }
                }
            },
            colors: [
                "#37D80A"
            ],
            labels: [
                "Total Booked"
            ],
            stroke: {
              dashArray: 7
            }
        };
        var chart = new ApexCharts(document.querySelector("#hotelRoomsAvailabilityChart"), options);
        chart.render();
    }

    // Hotel Guest Activity Chart
    const hotelGuestActivityChart = document.getElementById("hotelGuestActivityChart");
    if (hotelGuestActivityChart) {
        var options = {
            series: [
                { name: 'Check In', data: [15, 30, 20, 40, 35, 30, 25] },
                { name: 'Check Out', data: [10, 20, 15, 25, 30, 40, 30] }
            ],
            chart: {
                type: "area",
                height: 284,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#ffffff", "#D8FFC8"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2, 0],
                dashArray: [0, 6, 0]
            },
            grid: {
                show: true,
                borderColor: "#ffffff1a"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0.5,
                    opacityTo: 0.2
                }
            },
            xaxis: {
                categories: ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'],
                axisTicks: {
                    show: false,
                    color: '#ffffff1a'
                },
                axisBorder: {
                    show: false,
                    color: '#ffffff1a'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#B1BBC8",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                // max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#B1BBC8",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ffffff1a'
                },
                axisTicks: {
                    show: false,
                    color: '#ffffff1a'
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#hotelGuestActivityChart"), options);
        chart.render();
    }

    // Popular Rooms Slides
    const popularRoomsSlides = document.getElementById("popularRoomsSlides");
    if (popularRoomsSlides) {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                768: {
                    spaceBetween: 25,
                    slidesPerView: 3
                },
                1024: {
                    slidesPerView: 3
                },
                1440: {
                    slidesPerView: 4
                }
            }
        });
    }

    // Real Estate Agent Total Revenue Chart
    const realEstateAgentTotalRevenueChart = document.getElementById("realEstateAgentTotalRevenueChart");
    if (realEstateAgentTotalRevenueChart) {
        var options = {
            series: [{ name: "Net Profit", data: [15, 12, 30, 55, 25, 38, 15, 30, 12, 15, 30, 48] }],
            chart: {
                type: "bar",
                height: 322,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#757DFF"
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "50%"
                }
            },
            fill: {
                opacity: 1
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 5,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                axisTicks: {
                    show: true,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: true,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                // tickAmount: 5,
                // max: 90,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'k'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'circle'
                }
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            }
        };
        var chart = new ApexCharts(document.querySelector("#realEstateAgentTotalRevenueChart"), options);
        chart.render();
    }

    // My Featured Listings Slides
    const myFeaturedListingsSlides = document.getElementById("myFeaturedListingsSlides");
    if (myFeaturedListingsSlides) {
        var swiper = new Swiper(".mySwiper", {
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                768: {
                    spaceBetween: 25,
                    slidesPerView: 2
                }
            }
        });
    }

    // Real Estate Agent Revenue Goal Progress Chart
    const realEstateAgentRevenueGoalProgressChart = document.getElementById("realEstateAgentRevenueGoalProgressChart");
    if (realEstateAgentRevenueGoalProgressChart) {
        var options = {
            series: [
                { name: 'Prediction', data: [108, 130, 110, 140, 130, 115, 125, 115, 125, 140, 140, 130] },
                { name: 'Gained', data: [135, 115, 128, 120, 125, 130, 135, 130, 135, 145, 120, 125] }
            ],
            chart: {
                type: "line",
                height: 399,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#757DFF", "#E9D5FF"
            ],
            stroke: {
                width: 4,
                curve: "straight",
                dashArray: [0, 8]
            },
            grid: {
                show: true,
                borderColor: "#ECF0FF"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                max: 150,
                min: 100,
                labels: {
                    formatter: (val) => {
                        return '$' + val + 'K'
                    },
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#DDE4FF'
                },
                axisTicks: {
                    show: false,
                    color: '#DDE4FF'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "k";
                    }
                }
            },
            fill: {
                opacity: 1
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#realEstateAgentRevenueGoalProgressChart"), options);
        chart.render();
    }

    // Popular Rooms Slides
    const clientRatingsSlides = document.getElementById("clientRatingsSlides");
    if (clientRatingsSlides) {
        var swiper = new Swiper(".mySwiper2", {
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: ".swiper-pagination2",
                clickable: true
            },
            autoplay: {
                delay: 2500,
                disableOnInteraction: false
            },
            breakpoints: {
                640: {
                    slidesPerView: 2
                },
                768: {
                    spaceBetween: 25,
                    slidesPerView: 2
                },
                1024: {
                    spaceBetween: 25,
                    slidesPerView: 3
                },
                1440: {
                    spaceBetween: 25,
                    slidesPerView: 3
                }
            }
        });
    }

    // Credit Cards With Amount Chart
    const creditCardsWithAmountChart = document.getElementById("creditCardsWithAmountChart");
    if (creditCardsWithAmountChart) {
        var options = {
            series: [
                {
                    name: 'Projects',
                    data: [1870, 2000, 1490, 1410, 1680]
                }
            ],
            chart: {
                type: "bar",
                height: 211,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF"
            ],
            plotOptions: {
                bar: {
                    horizontal: true
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            dataLabels: {
                enabled: true,
                style: {
                    fontSize: '11px',
                    fontWeight: 'normal'
                }
            },
            fill: {
                opacity: 1
            },
            xaxis: {
                categories: [
                    'Rewards Card', 'Cashback Card', 'Travel Card', 'Student Card', 'Business Card'
                ],
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "11px"
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: "#64748B",
                        fontSize: "11px"
                    }
                },
                axisBorder: {
                    show: true,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: true,
                    color: '#ECEEF2'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#creditCardsWithAmountChart"), options);
        chart.render();
    }

    // Credit Card Utilization Ratio Chart
    const creditCardUtilizationRatioChart = document.getElementById("creditCardUtilizationRatioChart");
    if (creditCardUtilizationRatioChart) {
        var options = {
            series: [
                {
                    name: "Ratio",
                    data: [30, 65, 85]
                }
            ],
            chart: {
                type: "bar",
                height: 202,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#37D80A", "#FE7A36", "#FF4023"
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "55%",
                    distributed: true
                }
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                categories: [
                    "0-30%",
                    "30-70%",
                    "70%+"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 100,
                min: 0,
                labels: {
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#creditCardUtilizationRatioChart"), options);
        chart.render();
    }

    // Credit Card Monthly Spending Chart
    const creditCardMonthlySpendingChart = document.getElementById("creditCardMonthlySpendingChart");
    if (creditCardMonthlySpendingChart) {
        var options = {
            series: [{
                name: "Spend",
                data: [0, 51, 45, 75, 70]
            }],
            chart: {
                height: 202,
                type: 'line',
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                '#5C61F2'
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth',
                width: 2
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                categories: [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May"
                ],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val;
                    },
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            tooltip: {
                y: {
                    formatter: (val) => {
                        return "$" + val;
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#creditCardMonthlySpendingChart"), options);
        chart.render();
    }

    // Credit Card Spending Breakdown Chart
    const creditCardSpendingBreakdownChart = document.getElementById("creditCardSpendingBreakdownChart");
    if (creditCardSpendingBreakdownChart) {
        var options = {
            series: [30, 20, 12, 10, 8, 6],
            chart: {
                height: 284,
                type: "donut"
            },
            labels: ["Groceries", "Utilities", "Rent", "Entertainment", "Transportation", "Other"],
            colors: [
                "#37D80A", "#FE7A36", "#3584FC", "#FF4023", "#AD63F6", "#605DFF"
            ],
            stroke: {
                width: 2,
                show: true,
                colors: ["#ffffff"]
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: false,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '28px',
                                fontWeight: '600',
                                formatter: (val, opts) => {
                                    const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    const percentage = ((val / total) * 100).toFixed(1); // Calculate percentage
                                    return `${val}k (${percentage}%)`; // Show value in currency + percentage
                                }
                            },
                            total: {
                                show: true,
                                color: '#64748B',
                                formatter: (w) => {
                                    return `${w.globals.seriesTotals.reduce((a, b) => a + b, 0)}k`; // Show total in currency
                                }
                            }
                        }
                    }
                }
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'left',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 0,
                    vertical: 7
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#creditCardSpendingBreakdownChart"), options);
        chart.render();
    }

    // Credit Card Interest Charge & Fees Chart
    const creditCardInterestChargeFeesChart = document.getElementById("creditCardInterestChargeFeesChart");
    if (creditCardInterestChargeFeesChart) {
        var options = {
            series: [
                { name: "Interest Charge", data: [28, 15, 18, 25] },
                { name: "Fees", data: [5, 7, 8, 9] }
            ],
            chart: {
                type: "bar",
                height: 300,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#605DFF", "#FF4023"
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "70%",
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                show: true,
                colors: ["transparent"]
            },
            xaxis: {
                categories: ["2022", "2023", "2024", "2025"],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 40,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return val + "%";
                    },
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            }
        };
        var chart = new ApexCharts(document.querySelector("#creditCardInterestChargeFeesChart"), options);
        chart.render();
    }

    // Credit Card Statistics Chart
    const creditCardStatisticsChart = document.getElementById("creditCardStatisticsChart");
    if (creditCardStatisticsChart) {
        var options = {
            series: [
                { name: "Income", data: [35, 45, 55, 35, 65, 38, 63] },
                { name: "Expense", data: [25, 15, 45, 25, 15, 20, 25] }
            ],
            chart: {
                type: "area",
                height: 298,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#37D80A", "#EE3E08"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2]
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                // max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val;
                    },
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#creditCardStatisticsChart"), options);
        chart.render();
    }

    // Crypto Trader Price Movement Chart
    const cryptoTraderPriceMovementChart1 = document.getElementById("cryptoTraderPriceMovementChart1");
    if (cryptoTraderPriceMovementChart1) {
        var options = {
            series: [{
                name: "Price",
                data: [
                    {
                        x: new Date(2016, 1, 1),
                        y: [51.98, 56.29, 51.59, 53.85]
                    },
                    {
                        x: new Date(2016, 2, 1),
                        y: [53.66, 54.99, 51.35, 52.95]
                    },
                    {
                        x: new Date(2016, 3, 1),
                        y: [52.96, 53.78, 51.54, 52.48]
                    },
                    {
                        x: new Date(2016, 4, 1),
                        y: [52.54, 52.79, 47.88, 49.24]
                    },
                    {
                        x: new Date(2016, 5, 1),
                        y: [49.1, 52.86, 47.7, 52.78]
                    },
                    {
                        x: new Date(2016, 6, 1),
                        y: [52.83, 53.48, 50.32, 52.29]
                    },
                    {
                        x: new Date(2016, 7, 1),
                        y: [52.2, 54.48, 51.64, 52.58]
                    },
                    {
                        x: new Date(2016, 8, 1),
                        y: [52.76, 57.35, 52.15, 57.03]
                    },
                    {
                        x: new Date(2016, 9, 1),
                        y: [57.04, 58.15, 48.88, 56.19]
                    },
                    {
                        x: new Date(2016, 10, 1),
                        y: [56.09, 58.85, 55.48, 58.79]
                    },
                    {
                        x: new Date(2016, 11, 1),
                        y: [58.78, 59.65, 58.23, 59.05]
                    },
                    {
                        x: new Date(2017, 0, 1),
                        y: [59.37, 61.11, 59.35, 60.34]
                    },
                    {
                        x: new Date(2017, 1, 1),
                        y: [60.4, 60.52, 56.71, 56.93]
                    },
                    {
                        x: new Date(2017, 2, 1),
                        y: [57.02, 59.71, 56.04, 56.82]
                    },
                    {
                        x: new Date(2017, 3, 1),
                        y: [66.97, 69.62, 54.77, 59.3]
                    },
                    {
                        x: new Date(2017, 4, 1),
                        y: [59.11, 62.29, 59.1, 59.85]
                    },
                    {
                        x: new Date(2017, 5, 1),
                        y: [59.97, 60.11, 55.66, 58.42]
                    },
                    {
                        x: new Date(2017, 6, 1),
                        y: [58.34, 60.93, 56.75, 57.42]
                    },
                    {
                        x: new Date(2017, 7, 1),
                        y: [57.76, 58.08, 51.18, 54.71]
                    },
                    {
                        x: new Date(2017, 8, 1),
                        y: [64.8, 71.42, 53.18, 57.35]
                    },
                    {
                        x: new Date(2017, 9, 1),
                        y: [57.56, 63.09, 57.0, 62.99]
                    },
                    {
                        x: new Date(2017, 10, 1),
                        y: [62.89, 63.42, 59.72, 61.76]
                    },
                    {
                        x: new Date(2017, 11, 1),
                        y: [61.71, 64.15, 61.29, 63.04]
                    }
                ]
            }],
            chart: {
                id: 'candlestickChart',
                type: "candlestick",
                height: 350,
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#37D80A',
                        downward: '#FF4023'
                    },
                    wick: {
                        useFillColor: true
                    }
                }
            },
            fill: {
                opacity: 1
            },
            xaxis: {
                type: "datetime",
                axisTicks: {
                    show: true,
                    color: '#64748B'
                },
                axisBorder: {
                    show: true,
                    color: '#64748B'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tooltip: {
                    enabled: true
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#64748B'
                },
                axisTicks: {
                    show: false,
                    color: '#64748B'
                }
            },
            grid: {
                show: true,
                borderColor: "#F6F7F9"
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderPriceMovementChart1"), options);
        chart.render();
    }
    const cryptoTraderPriceMovementChart2 = document.getElementById("cryptoTraderPriceMovementChart2");
    if (cryptoTraderPriceMovementChart2) {
        var options = {
            series: [{
                name: "Volume",
                data: [
                    {
                        x: new Date(2016, 1, 1),
                        y: 3.85
                    },
                    {
                        x: new Date(2016, 2, 1),
                        y: 2.95
                    },
                    {
                        x: new Date(2016, 3, 1),
                        y: -12.48
                    },
                    {
                        x: new Date(2016, 4, 1),
                        y: 19.24
                    },
                    {
                        x: new Date(2016, 5, 1),
                        y: 12.78
                    },
                    {
                        x: new Date(2016, 6, 1),
                        y: 22.29
                    },
                    {
                        x: new Date(2016, 7, 1),
                        y: -12.58
                    },
                    {
                        x: new Date(2016, 8, 1),
                        y: -17.03
                    },
                    {
                        x: new Date(2016, 9, 1),
                        y: -19.19
                    },
                    {
                        x: new Date(2016, 10, 1),
                        y: -28.79
                    },
                    {
                        x: new Date(2016, 11, 1),
                        y: -39.05
                    },
                    {
                        x: new Date(2017, 0, 1),
                        y: 20.34
                    },
                    {
                        x: new Date(2017, 1, 1),
                        y: 36.93
                    },
                    {
                        x: new Date(2017, 2, 1),
                        y: 36.82
                    },
                    {
                        x: new Date(2017, 3, 1),
                        y: 29.3
                    },
                    {
                        x: new Date(2017, 4, 1),
                        y: 39.85
                    },
                    {
                        x: new Date(2017, 5, 1),
                        y: 28.42
                    },
                    {
                        x: new Date(2017, 6, 1),
                        y: 37.42
                    },
                    {
                        x: new Date(2017, 7, 1),
                        y: 24.71
                    },
                    {
                        x: new Date(2017, 8, 1),
                        y: 37.35
                    },
                    {
                        x: new Date(2017, 9, 1),
                        y: 32.99
                    },
                    {
                        x: new Date(2017, 10, 1),
                        y: 31.76
                    },
                    {
                        x: new Date(2017, 11, 1),
                        y: 43.04
                    }
                ]
            }],
            chart: {
                type: "bar",
                height: 160,
                toolbar: {
                    show: false
                },
                brush: {
                    enabled: true,
                    target: "candlestickChart"
                },
                selection: {
                    enabled: true,
                    xaxis: {
                        min: new Date("16 June 2016").getTime(),
                        max: new Date("10 October 2017").getTime()
                    },
                    fill: {
                        color: "#ccc",
                        opacity: 0.4
                    },
                    stroke: {
                        color: "#0D47A1"
                    }
                }
            },
            fill: {
                opacity: 1
            },
            colors: [
                "#605DFF"
            ],
            xaxis: {
                type: "datetime",
                axisTicks: {
                    show: true,
                    color: '#64748B'
                },
                axisBorder: {
                    show: true,
                    color: '#64748B'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tooltip: {
                    enabled: true
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#64748B'
                },
                axisTicks: {
                    show: false,
                    color: '#64748B'
                }
            },
            grid: {
                show: true,
                borderColor: "#F6F7F9"
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderPriceMovementChart2"), options);
        chart.render();
    }

    // Crypto Trader Trading Volume Chart
    const cryptoTraderTradingVolumeChart = document.getElementById("cryptoTraderTradingVolumeChart");
    if (cryptoTraderTradingVolumeChart) {
        var options = {
            series: [
                {
                    name: "Volume",
                    data: [130, 200, 160, 80, 70, 120, 140]
                }
            ],
            chart: {
                type: "bar",
                height: 200,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#757DFF"
            ],
            plotOptions: {
                bar: {
                    columnWidth: "15px",
                    colors: {
                        backgroundBarColors: ["#DDE4FF"],
                        backgroundBarOpacity: 0.2
                    }
                }
            },
            grid: {
                show: true,
                borderColor: "#F6F7F9"
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri",
                    "Sat",
                    "Sun"
                ],
                axisTicks: {
                    show: true,
                    color: '#64748B'
                },
                axisBorder: {
                    show: true,
                    color: '#64748B'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                max: 200,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return '$' + val;
                    },
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#64748B'
                },
                axisTicks: {
                    show: false,
                    color: '#64748B'
                }
            },
            fill: {
                opacity: 1
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'left',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderTradingVolumeChart"), options);
        chart.render();
    }

    // Crypto Trader Portfolio Distribution Chart
    const cryptoTraderPortfolioDistributionChart = document.getElementById("cryptoTraderPortfolioDistributionChart");
    if (cryptoTraderPortfolioDistributionChart) {
        var options = {
            series: [30, 20, 12, 10, 8, 6],
            chart: {
                height: 195,
                type: "donut"
            },
            labels: ["Bitcoin", "Ethereum", "BNB", "Tether", "Ripple", "Others"],
            colors: [
                "#9135E8", "#AD63F6", "#BF85FB", "#D7B5FD", "#E9D5FF", "#F3E8FF"
            ],
            stroke: {
                width: 2,
                show: true,
                colors: ["#ffffff"]
            },
            dataLabels: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    expandOnClick: false,
                    donut: {
                        labels: {
                            show: false,
                            name: {
                                color: '#64748B'
                            },
                            value: {
                                show: true,
                                color: '#3A4252',
                                fontSize: '28px',
                                fontWeight: '600',
                                formatter: (val, opts) => {
                                    const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                                    const percentage = ((val / total) * 100).toFixed(1); // Calculate percentage
                                    return `${val}k (${percentage}%)`; // Show value in currency + percentage
                                }
                            },
                            total: {
                                show: true,
                                color: '#64748B',
                                formatter: (w) => {
                                    return `${w.globals.seriesTotals.reduce((a, b) => a + b, 0)}k`; // Show total in currency
                                }
                            }
                        }
                    }
                }
            },
            legend: {
                show: true,
                offsetY: 0,
                fontSize: '12px',
                position: 'left',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 0,
                    vertical: 5
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderPortfolioDistributionChart"), options);
        chart.render();
    }

    // Crypto Trader Profit Loss Chart
    const cryptoTraderProfitLossChart = document.getElementById("cryptoTraderProfitLossChart");
    if (cryptoTraderProfitLossChart) {
        var options = {
            series: [
                { name: "Profit", data: [35, 45, 55, 35, 65, 38, 63] },
                { name: "Loss", data: [25, 15, 45, 25, 15, 20, 25] }
            ],
            chart: {
                type: "area",
                height: 280,
                zoom: {
                    enabled: false
                },
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#37D80A", "#EE3E08"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth",
                width: [2, 2]
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.5
                }
            },
            xaxis: {
                categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                // max: 100,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return val + '%';
                    },
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderProfitLossChart"), options);
        chart.render();
    }

    // Crypto Trader Risk Exposure Chart
    const cryptoTraderRiskExposureChart = document.getElementById("cryptoTraderRiskExposureChart");
    if (cryptoTraderRiskExposureChart) {
        var options = {
            series: [
                { name: "Risk", data: [80, 50, 30, 40, 100, 20] },
                { name: "Risk", data: [20, 30, 40, 80, 20, 80] },
                { name: "Risk", data: [30, 70, 80, 15, 45, 10] }
            ],
            chart: {
                height: 340,
                type: "radar",
                toolbar: {
                    show: false
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ["Market", "Technology", "Compliance", "Liquidity", "Operational", "Credit"],
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            markers: {
                size: 3,
                strokeWidth: 0
            },
            colors: [
                "#FD5812", "#37D80A", "#605DFF"
            ],
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.4
                }
            },
            yaxis: {
                show: false,
                tickAmount: 5
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            },
            legend: {
                show: false,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 0
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderRiskExposureChart"), options);
        chart.render();
    }

    // Crypto Trader Trades Per Month Chart
    const cryptoTraderTradesPerMonthChart = document.getElementById("cryptoTraderTradesPerMonthChart");
    if (cryptoTraderTradesPerMonthChart) {
        var options = {
            series: [
                {
                    name: "Price",
                    data: [
                        {
                            x: new Date(1538778600000),
                            y: [6629.81, 6650.5, 6623.04, 6633.33]
                        },
                        {
                            x: new Date(1538780400000),
                            y: [6632.01, 6643.59, 6620, 6630.11]
                        },
                        {
                            x: new Date(1538782200000),
                            y: [6630.71, 6648.95, 6623.34, 6635.65]
                        },
                        {
                            x: new Date(1538784000000),
                            y: [6635.65, 6651, 6629.67, 6638.24]
                        },
                        {
                            x: new Date(1538785800000),
                            y: [6638.24, 6640, 6620, 6624.47]
                        },
                        {
                            x: new Date(1538787600000),
                            y: [6624.53, 6636.03, 6621.68, 6624.31]
                        },
                        {
                            x: new Date(1538789400000),
                            y: [6624.61, 6632.2, 6617, 6626.02]
                        },
                        {
                            x: new Date(1538791200000),
                            y: [6627, 6627.62, 6584.22, 6603.02]
                        },
                        {
                            x: new Date(1538793000000),
                            y: [6605, 6608.03, 6598.95, 6604.01]
                        },
                        {
                            x: new Date(1538794800000),
                            y: [6604.5, 6614.4, 6602.26, 6608.02]
                        },
                        {
                            x: new Date(1538796600000),
                            y: [6608.02, 6610.68, 6601.99, 6608.91]
                        },
                        {
                            x: new Date(1538798400000),
                            y: [6608.91, 6618.99, 6608.01, 6612]
                        },
                        {
                            x: new Date(1538800200000),
                            y: [6612, 6615.13, 6605.09, 6612]
                        },
                        {
                            x: new Date(1538802000000),
                            y: [6612, 6624.12, 6608.43, 6622.95]
                        }
                    ]
                }
            ],
            chart: {
                type: "candlestick",
                height: 281,
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                candlestick: {
                    colors: {
                        upward: '#EE3E08',
                        downward: '#4936F5'
                    },
                    wick: {
                        useFillColor: true
                    }
                }
            },
            fill: {
                opacity: 1
            },
            xaxis: {
                type: "datetime",
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#8695AA",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                tooltip: {
                    enabled: true
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#64748B",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#ECEEF2'
                },
                axisTicks: {
                    show: false,
                    color: '#ECEEF2'
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderTradesPerMonthChart"), options);
        chart.render();
    }

    // Crypto Trader Asset Allocation Chart
    const cryptoTraderAssetAllocationChart = document.getElementById("cryptoTraderAssetAllocationChart");
    if (cryptoTraderAssetAllocationChart) {
        var options = {
            series: [30, 25, 20, 15, 10],
            chart: {
                height: 237,
                type: "pie"
            },
            labels: [
                "BTC 30%", "ETH 25%", "USDC 20%", "ADA 15%", "SHIB 10%"
            ],
            colors: [
                "#605DFF", "#757DFF", "#9CAAFF", "#C2CDFF", "#DDE4FF"
            ],
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            dataLabels: {
                enabled: false
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderAssetAllocationChart"), options);
        chart.render();
    }

    // Crypto Trader Market Sentiment Indicator Chart
    const cryptoTraderMarketSentimentIndicatorChart = document.getElementById("cryptoTraderMarketSentimentIndicatorChart");
    if (cryptoTraderMarketSentimentIndicatorChart) {
        var options = {
            series: [
                100
            ],
            chart: {
                type: "radialBar",
                height: 365
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#ffffff",
                        strokeWidth: '100%',
                    },
                    dataLabels: {
                        show: false
                    }
                }
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "dark",
                    type: "horizontal",
                    gradientToColors: ["#FF3D00"],
                    stops: [0, 50, 100],
                    colorStops: [
                        { offset: 0, color: "#00C851", opacity: 1 },  // Extreme Greed (Green)
                        { offset: 25, color: "#8BC34A", opacity: 1 }, // Greed (Light Green)
                        { offset: 50, color: "#FFC107", opacity: 1 }, // Neutral (Yellow)
                        { offset: 75, color: "#FF9800", opacity: 1 }, // Fear (Orange)
                        { offset: 100, color: "#FF3D00", opacity: 1 } // Extreme Fear (Red)
                    ]
                }
            },
            stroke: {
                lineCap: "round"
            },
            labels: [
                "Market Sentiment"
            ]
        };
        var chart = new ApexCharts(document.querySelector("#cryptoTraderMarketSentimentIndicatorChart"), options);
        chart.render();
    }

    // Crypto Trader Trades Per Month Chart
    const cryptoPerformancePerInvestmentChart = document.getElementById("cryptoPerformancePerInvestmentChart");
    if (cryptoPerformancePerInvestmentChart) {
        var options = {
            series: [
                {
                    name: "Coin",
                    data: [
                        { x: "Bitcoin", y: [8, 2] },
                        { x: "Ethereum", y: [5, 3] },
                        { x: "Solana", y: [4, 8] },
                        { x: "Tether", y: [3, 5] },
                        { x: "USDC", y: [2, 5] },
                        { x: "XRP", y: [1, 2] }
                    ]
                }
            ],
            chart: {
                type: "rangeBar",
                height: 410,
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#3584FC"
            ],
            plotOptions: {
                bar: {
                    horizontal: false
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val + "%";
                },
                style: {
                    fontSize: '12px',
                    fontWeight: '400'
                }
            },
            legend: {
                show: false,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                axisTicks: {
                    show: true,
                    color: '#64748B'
                },
                axisBorder: {
                    show: true,
                    color: '#64748B'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                // max: 3000,
                min: 0,
                labels: {
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#64748B'
                },
                axisTicks: {
                    show: false,
                    color: '#64748B'
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return val + "%";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoPerformancePerInvestmentChart"), options);
        chart.render();
    }

    // Crypto Performance Market Performance Chart
    const cryptoPerformanceMarketPerformanceChart = document.getElementById("cryptoPerformanceMarketPerformanceChart");
    if (cryptoPerformanceMarketPerformanceChart) {
        var options = {
            series: [25, 18, 22, 35, 15, 28],
            chart: {
                height: 339,
                type: "pie"
            },
            labels: ["Revenue Growth", "Profit Margins", "Cost of Goods Sold", "Market Share", "Sales Volume", "Return on Investment"],
            colors: [
                "#37D80A", "#3584FC", "#FE7A36", "#AD63F6", "#FF4023", "#605DFF"
            ],
            stroke: {
                width: 0,
                show: true,
                colors: ["#ffffff"]
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 6
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            },
            dataLabels: {
                enabled: false
            },
            tooltip: {
                y: {
                    formatter: (val) => {
                        return val + "%";
                    }
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoPerformanceMarketPerformanceChart"), options);
        chart.render();
    }

    // Crypto Performance Metrics Chart
    const cryptoPerformanceMetricsChart = document.getElementById("cryptoPerformanceMetricsChart");
    if (cryptoPerformanceMetricsChart) {
        var options = {
            series: [
                { name: "Revenue", data: [120, 130, 140, 155, 165, 175, 185, 190, 200, 205, 200, 225] },
                { name: "Expenses", data: [10, 20, 30, 40, 50, 60, 70, 70, 90, 100, 110, 90] },
                { name: "Profit", data: [0, 5, 10, 15, 20, 25, 30, 35, 25, 45, 50, 55] }
            ],
            chart: {
                height: 370,
                type: "line",
                toolbar: {
                    show: false
                }
            },
            colors: [
                "#37D80A", "#FF4023", "#605DFF"
            ],
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: 2,
                curve: "smooth",
                dashArray: [0, 0, 0]
            },
            markers: {
                size: 3,
                hover: {
                    sizeOffset: 3
                }
            },
            tooltip: {
                y: {
                    formatter: function(val) {
                        return "$" + val + "k";
                    }
                }
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisTicks: {
                    show: true,
                    color: '#64748B'
                },
                axisBorder: {
                    show: true,
                    color: '#64748B'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 5,
                // max: 3000,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return "$" + val + "k";
                    },
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#64748B'
                },
                axisTicks: {
                    show: false,
                    color: '#64748B'
                }
            },
            legend: {
                show: true,
                position: 'bottom',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 10,
                    vertical: 10
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoPerformanceMetricsChart"), options);
        chart.render();
    }

    // Crypto Performance Risk & Stability Indicators Chart
    const cryptoPerformanceRiskStabilityIndicatorsChart = document.getElementById("cryptoPerformanceRiskStabilityIndicatorsChart");
    if (cryptoPerformanceRiskStabilityIndicatorsChart) {
        var options = {
            series: [
                {
                    name: "Liquidity",
                    data: [60, 80, 100, 120, 140, 150]
                },
                {
                    name: "Volatility",
                    data: [180, 160, 80, 140, 100, 80]
                },
                {
                    name: "Operational",
                    data: [100, 130, 140, 60, 40, 20]
                }
            ],
            chart: {
                height: 354,
                type: "radar",
                toolbar: {
                    show: false
                }
            },
            xaxis: {
                labels: {
                    show: false
                }
            },
            fill: {
                type: 'gradient',
                gradient: {
                    stops: [0, 90, 100],
                    shadeIntensity: 1,
                    opacityFrom: 0,
                    opacityTo: 0.4
                }
            },
            colors: [
                "#AD63F6", "#605DFF", "#37D80A"
            ],
            yaxis: {
                show: true,
                tickAmount: 4
            },
            legend: {
                show: true,
                fontSize: '12px',
                position: 'bottom',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 8,
                    vertical: 6
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                },
                customLegendItems: ['Liquidity 50%', 'Volatility 20%', 'Operational 30%']
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoPerformanceRiskStabilityIndicatorsChart"), options);
        chart.render();
    }

    // Crypto Performance Comparative Analysis Chart
    const cryptoPerformanceComparativeAnalysisChart = document.getElementById("cryptoPerformanceComparativeAnalysisChart");
    if (cryptoPerformanceComparativeAnalysisChart) {
        var options = {
            series: [
                { name: 'Bitcoin', data: [[100, 20, 50]] },
                { name: 'Ethereum', data: [[300, 50, 70]] },
                { name: 'Cardano', data: [[500, 80, 80]] },
                { name: 'Solana', data: [[650, 40, 50]] },
                { name: 'Tether', data: [[850, 60, 70]] },
                { name: 'XRP', data: [[900, 20, 60]] }
            ],
            chart: {
                type: 'bubble',
                height: 384,
                toolbar: {
                    show: false
                }
            },
            colors: [
                '#757DFF', '#5DA8FF', '#BF85FB', '#1E8308', '#FE7A36', '#174EDE'
            ],
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true,
                borderColor: "#ECEEF2"
            },
            fill: {
                opacity: 1
            },
            xaxis: {
                tickAmount: 8,
                xaxisRange: { min: 0, max: 1000 },
                axisTicks: {
                    show: true,
                    color: '#64748B'
                },
                axisBorder: {
                    show: true,
                    color: '#64748B'
                },
                labels: {
                    show: true,
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                }
            },
            yaxis: {
                tickAmount: 4,
                // max: 3000,
                min: 0,
                labels: {
                    formatter: (val) => {
                        return "$" + val + "k";
                    },
                    style: {
                        colors: "#3A4252",
                        fontSize: "12px"
                    }
                },
                axisBorder: {
                    show: false,
                    color: '#64748B'
                },
                axisTicks: {
                    show: false,
                    color: '#64748B'
                }
            },
            legend: {
                show: true,
                position: 'top',
                fontSize: '12px',
                horizontalAlign: 'center',
                itemMargin: {
                    horizontal: 10,
                    vertical: 8
                },
                labels: {
                    colors: '#64748B'
                },
                markers: {
                    size: 6,
                    offsetX: -2,
                    offsetY: -.5,
                    shape: 'square'
                }
            }
        };
        var chart = new ApexCharts(document.querySelector("#cryptoPerformanceComparativeAnalysisChart"), options);
        chart.render();
    }

    // Back to Top
    const backToTopBtn = document.getElementById("backToTopBtn");
    if (backToTopBtn) {
        const backToTopBtn = document.getElementById("backToTopBtn");
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add("show");
            } else {
                backToTopBtn.classList.remove("show");
            }
        });
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
})();